import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Opcion, ErrorMessage } from '../../../_models';
import { Router } from '@angular/router';
import { OpcionService, AlertService } from '../../../_services';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'opciones',
    templateUrl: 'opciones.component.html',
})

export class OpcionesComponent implements OnInit {   
    
    opciones: Opcion[] = [];
    temp: Opcion[] = [];

    opcion: Opcion = new Opcion();
    errorMessage: ErrorMessage[] = [];
    rowsOnPage = 5;

    model: any = {};
    error = '';
    loading = false;        

    constructor(
        private opcionService: OpcionService,
        private router: Router,
        private alertService: AlertService,
        private ngbModal: NgbModal) {
        let self = this;
    }

    ngOnInit() {        
        this.loadAllOpciones();        
    }

    private loadAllOpciones() {        
        this.opcionService.getAll().subscribe(
            opciones => { 
                this.opciones = opciones; 
                this.temp = this.opciones;
            });
    }

    create() {
        this.showLoading(true);
        if(this.model.hiddenId == undefined){           
            this.opcionService.create(this.model)
                .subscribe(
                    data => {
                        this.model.nombre = '';
                        this.loadAllOpciones();
                        this.showLoading(false);
                    },
                    error => {
                        this.error = error;
                        this.showLoading(false);
                        setTimeout(function() {
                            this.error = '';                            
                        }.bind(this), 5000);
                    });
        }
        else{            
            this.model.idOpcion = this.model.hiddenId;
            this.opcionService.update(this.model)
                .subscribe(
                    data => {
                        this.model.hiddenId = '';
                        this.model.nombre = '';
                        this.loadAllOpciones();
                        this.showLoading(false);
                    },
                    error => {
                        this.error = error;                    
                        this.showLoading(false);
                        setTimeout(function() {
                            this.error = '';                            
                        }.bind(this), 5000);
                    });
        }
    } 

    closeError() {
        this.error = '';
    }

    edit(id: number, nombre: string) {
        this.model.hiddenId = id;
        this.model.nombre = nombre;
    }

    delete(id: number, content: any) {        
        this.ngbModal.open(content).result.then((result) => {
            this.showLoading(true);
            this.opcionService.delete(id)
                .subscribe(data => {                    
                    this.loadAllOpciones();                    
                    this.showLoading(false);
                }, error => {                    
                    this.error = JSON.parse(error._body);                      
                    this.showLoading(false);
                    setTimeout(function() {
                        this.error = '';                            
                    }.bind(this), 5000);                  
                })
        }, (reason) => {            
        });
    }

    showLoading(loading: boolean) {
        this.loading = loading;
    }

    filtrarTabla(event: any) { 
        const val = event.target.value.toLowerCase();

        // filter our data
        const temp = this.temp.filter(function(d) {
            return d.nombre.toLowerCase().indexOf(val) !== -1 || !val;
        }); 

        this.opciones = temp;
    }
}