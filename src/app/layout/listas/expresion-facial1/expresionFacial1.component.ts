import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ExpresionFacial1 } from './expresionFacial1';
import { ExpresionFacial1Service } from './expresionFacial1.service';

@Component({
    selector: 'ExpresionFacial1',
    templateUrl: 'ExpresionFacial1.component.html',
})

export class ExpresionFacial1Component implements OnInit {   
    
    expresionFacial1s: ExpresionFacial1[] = [];
    temp: ExpresionFacial1[] = [];

    expresionFacial1: ExpresionFacial1 = new ExpresionFacial1();
    rowsOnPage = 5;

    model: any = {};
    areErrors = false;
    errores: any[] = [];
    loading = false;        

    constructor(
        private expresionFacial1Service: ExpresionFacial1Service,
        private router: Router,
        private ngbModal: NgbModal) {
        let self = this;
    }

    ngOnInit() {        
        this.loadAllExpresionFacial1s();        
    }

    private loadAllExpresionFacial1s() {     
        this.showLoading(true);   
        this.expresionFacial1Service.getAll().subscribe(
            expresionFacial1s => {                 
                this.expresionFacial1s = expresionFacial1s; 
                this.temp = this.expresionFacial1s;
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
            this.expresionFacial1Service.create(this.model)
                .subscribe(
                    data => {                        
                        this.clearModel();
                        this.loadAllExpresionFacial1s();
                        this.showLoading(false);
                    },
                    error => {                        
                        this.errores = error.error;             
                        this.showErrors();
                        this.showLoading(false);
                    });
        }else{        
            this.model.idExpresionFacial1 = this.model.hiddenId;            
            this.expresionFacial1Service.update(this.model)
                .subscribe(
                    data => {
                        this.clearModel();
                        this.loadAllExpresionFacial1s();
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
        this.model.hiddenId = model.idExpresionFacial1;        
        this.model.nombre = model.nombre;
    }

    delete(idExpresionFacial1: string, content: any) {   
        this.clearAndcloseErrors();  
        this.ngbModal.open(content).result.then((result) => {
            this.showLoading(true);
            this.expresionFacial1Service.delete(idExpresionFacial1)
                .subscribe(data => {                    
                    this.loadAllExpresionFacial1s();                    
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
        this.model.idExpresionFacial1 = '';        
        this.model.nombre = '';
    }

    filtrarTabla(event: any) { 
        const val = event.target.value.toLowerCase();

        // filter our data
        const temp = this.temp.filter(function(d) {
            return d.nombre.toLowerCase().indexOf(val) !== -1 || !val;
        }); 

        this.expresionFacial1s = temp;
    }
}