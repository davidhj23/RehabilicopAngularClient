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
    areErrors = false;
    errores: any[] = [];
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
        this.showLoading(true);   
        this.sedeService.getAll().subscribe(
            sedes => { 
                this.sedes = sedes; 
                this.temp = this.sedes;
                this.showLoading(false);
            },
            error => {                        
                this.errores = error.error;             
                this.showErrors();
                this.showLoading(false);
            });
    }

    create() {

        let areErrors = false;
        this.clearAndcloseErrors();        

        if(this.model.nombre == undefined || this.model.nombre == ''){
            this.errores.push({ message: 'Nombre obligatorio'});
            areErrors = true;
        }

        if(areErrors){
            this.showErrors();
            return;
        }

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
                        this.errores = error.error;             
                        this.showErrors();
                        this.showLoading(false);
                    });
        }else{        
            this.model.idSede = this.model.hiddenId;            
            this.sedeService.update(this.model)
                .subscribe(
                    data => {
                        this.clearModel();
                        this.loadAllSedes();
                        this.showLoading(false);
                    },
                    error => {
                        this.errores = error.error;             
                        this.showErrors();
                        this.showLoading(false);
                    });
        }
    }     

    edit(model: any) {
        this.model.hiddenId = model.idSede;        
        this.model.nombre = model.nombre;
    }

    delete(idSede: string, content: any) {   
        this.clearAndcloseErrors(); 
        this.ngbModal.open(content).result.then((result) => {
            this.showLoading(true);
            this.sedeService.delete(idSede)
                .subscribe(data => {                    
                    this.loadAllSedes();                    
                    this.showLoading(false);
                }, error => {       
                    this.errores = error.error;             
                    this.showErrors();
                    this.showLoading(false);
                })
        }, (reason) => {            
        });
    }

    showLoading(loading: boolean) {
        this.loading = loading;
    }

    showErrors(){   
        this.areErrors = true;        
        this.showLoading(false);
        
        setTimeout(function() {
            this.clearAndcloseErrors();
        }.bind(this), 10000); 
    }

    clearAndcloseErrors(){
        this.errores = [];
        this.areErrors = false;                            
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