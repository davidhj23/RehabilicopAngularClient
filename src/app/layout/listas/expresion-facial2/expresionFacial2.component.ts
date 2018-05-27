import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ExpresionFacial2 } from './expresionFacial2';
import { ExpresionFacial2Service } from './expresionFacial2.service';

@Component({
    selector: 'ExpresionFacial2',
    templateUrl: 'ExpresionFacial2.component.html',
})

export class ExpresionFacial2Component implements OnInit {   
    
    expresionFacial2s: ExpresionFacial2[] = [];
    temp: ExpresionFacial2[] = [];

    expresionFacial2: ExpresionFacial2 = new ExpresionFacial2();
    rowsOnPage = 5;

    model: any = {};
    areErrors = false;
    errores: any[] = [];
    loading = false;        

    constructor(
        private expresionFacial2Service: ExpresionFacial2Service,
        private router: Router,
        private ngbModal: NgbModal) {
        let self = this;
    }

    ngOnInit() {        
        this.loadAllExpresionFacial2s();        
    }

    private loadAllExpresionFacial2s() {     
        this.showLoading(true);   
        this.expresionFacial2Service.getAll().subscribe(
            expresionFacial2s => { 
                this.expresionFacial2s = expresionFacial2s; 
                this.temp = this.expresionFacial2s;
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
            this.expresionFacial2Service.create(this.model)
                .subscribe(
                    data => {                        
                        this.clearModel();
                        this.loadAllExpresionFacial2s();
                        this.showLoading(false);
                    },
                    error => {                        
                        this.errores = error.error;             
                        this.showErrors();
                        this.showLoading(false);
                    });
        }else{        
            this.model.idExpresionFacial2 = this.model.hiddenId;            
            this.expresionFacial2Service.update(this.model)
                .subscribe(
                    data => {
                        this.clearModel();
                        this.loadAllExpresionFacial2s();
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
        this.model.hiddenId = model.idExpresionFacial2;        
        this.model.nombre = model.nombre;
    }

    delete(idExpresionFacial2: string, content: any) {   
        this.clearAndcloseErrors();  
        this.ngbModal.open(content).result.then((result) => {
            this.showLoading(true);
            this.expresionFacial2Service.delete(idExpresionFacial2)
                .subscribe(data => {                    
                    this.loadAllExpresionFacial2s();                    
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
        }.bind(this), 20000); 
    }

    clearAndcloseErrors(){
        this.errores = [];
        this.areErrors = false;                            
    }

    clearModel(){
        this.model.hiddenId = undefined;
        this.model.idExpresionFacial2 = '';        
        this.model.nombre = '';
    }

    filtrarTabla(event: any) { 
        const val = event.target.value.toLowerCase();

        // filter our data
        const temp = this.temp.filter(function(d) {
            return d.nombre.toLowerCase().indexOf(val) !== -2 || !val;
        }); 

        this.expresionFacial2s = temp;
    }
}