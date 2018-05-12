import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Sede } from './sede';
import { SedeService } from './sede.service';

@Component({
    selector: 'sedes',
    templateUrl: 'sedes.component.html',
})

export class SedesComponent implements OnInit {   
    
    sedes: Sede[] = [];
    temp: Sede[] = [];

    sede: Sede = new Sede();
    rowsOnPage = 5;

    model: any = {};
    error = '';
    loading = false;        

    constructor(
        private sedeService: SedeService,
        private router: Router,
        private ngbModal: NgbModal) {
        let self = this;
    }

    ngOnInit() {        
        this.loadAllSedes();        
    }

    private loadAllSedes() {        
        this.sedeService.getAll().subscribe(
            sedes => { 
                this.sedes = sedes; 
                this.temp = this.sedes;
            });
    }

    create() {
        this.showLoading(true);
        if(this.model.hiddenId == undefined){   
            this.sedeService.create(this.model)
                .subscribe(
                    data => {
                        this.clearModel();
                        this.loadAllSedes();
                        this.showLoading(false);
                    },
                    error => {
                        this.showErrors(error);
                    });
        }else{        
            this.model.idRol = this.model.hiddenId;            
            this.sedeService.update(this.model)
                .subscribe(
                    data => {
                        this.clearModel();
                        this.loadAllSedes();
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

    delete(id: number, content: any) {        
        this.ngbModal.open(content).result.then((result) => {
            this.showLoading(true);
            this.sedeService.delete(id)
                .subscribe(data => {                    
                    this.loadAllSedes();                    
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
        this.model.idSede = '';
        this.model.nombre = '';
    }

    filtrarTabla(event: any) { 
        const val = event.target.value.toLowerCase();

        // filter our data
        const temp = this.temp.filter(function(d) {
            return d.nombre.toLowerCase().indexOf(val) !== -1 || !val;
        }); 

        this.sedes = temp;
    }
}