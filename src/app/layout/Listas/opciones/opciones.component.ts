import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { OpcionService } from './opcion.service';
import { Opcion } from '.';

@Component({
    selector: 'opciones',
    templateUrl: 'opciones.component.html',
})

export class OpcionesComponent implements OnInit {   
    
    opciones: Opcion[] = [];
    temp: Opcion[] = [];

    opcion: Opcion = new Opcion();
    rowsOnPage = 5;

    model: any = {};
    error = '';
    loading = false;        

    constructor(
        private opcionService: OpcionService,
        private router: Router,
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

        this.showError('');
        if(this.model.nombre == undefined || this.model.nombre == ''){
            this.showError('Nombre obligatorio');
            return;
        }

        this.showLoading(true);
        if(this.model.hiddenId == undefined){   
            this.opcionService.create(this.model)
                .subscribe(
                    data => {
                        this.clearModel();
                        this.loadAllOpciones();
                        this.showLoading(false);
                    },
                    error => {
                        this.showErrors(error);
                    });
        }else{        
            this.model.idOpcion = this.model.hiddenId;            
            this.opcionService.update(this.model)
                .subscribe(
                    data => {
                        this.clearModel();
                        this.loadAllOpciones();
                        this.showLoading(false);
                    },
                    error => {
                        this.showErrors(error);
                    });
        }
    }     

    edit(id: number, nombre: string) {
        this.model.hiddenId = id;
        this.model.nombre = nombre;
    }

    delete(id: string, content: any) {        
        this.ngbModal.open(content).result.then((result) => {
            this.showLoading(true);
            this.opcionService.delete(id)
                .subscribe(data => {                    
                    this.loadAllOpciones();                    
                    this.showLoading(false);
                }, error => {                    
                    this.showErrors(error);
                })
        }, (reason) => {            
        });
    }

    showLoading(loading: boolean) {
        this.loading = loading;
    }

    showError(error: any){
        this.error = error;                      
        this.showLoading(false);
        setTimeout(function() {
            this.error = '';                            
        }.bind(this), 5000); 
    }

    showErrors(error: any){
        this.error = JSON.parse(error._body);                      
        this.showLoading(false);
        setTimeout(function() {
            this.error = '';                            
        }.bind(this), 5000); 
    }

    closeError() {
        this.error = '';
    }

    clearModel(){
        this.model.hiddenId = undefined;
        this.model.idOpcion = '';
        this.model.nombre = '';
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