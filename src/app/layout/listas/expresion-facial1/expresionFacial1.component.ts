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
    model: any = {};
    modelToEdit: any = {};

    loading = false;        
    rowsOnPage = 5;
    
    areErrors = false;
    errores: any[] = [];   
    areEditErrors = false;
    editErrores: any[] = [];         

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

    filtrarTabla(event: any) { 
        const val = event.target.value.toLowerCase();

        // filter our data
        const temp = this.temp.filter(function(d) {
            return d.nombre.toLowerCase().indexOf(val) !== -1 || !val;
        }); 

        this.expresionFacial1s = temp;
    }

    create() {
        if(!this.validateCreate()) return;

        this.showLoading(true);    
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
    }     

    validateCreate(){
        let areErrors = false;
        this.clearAndcloseErrors();        

        if(this.model.nombre == undefined || this.model.nombre == ''){
            this.errores.push({ message: 'Nombre obligatorio'});
            areErrors = true;
        }

        if(areErrors){
            this.showErrors();
            return false;
        }

        return true;
    }

    edit(model: any, editContent: any) {            
        this.modelToEdit.idCama = model.idCama;     
        this.modelToEdit.nombre = model.nombre;     

        this.ngbModal.open(editContent).result.then((result) => {
            
            this.showLoading(true);      
            if(this.validateEdit()){                                               
                this.expresionFacial1Service.update(this.modelToEdit)
                    .subscribe(
                        data => {
                            this.clearModel();
                            this.loadAllExpresionFacial1s();
                            this.showLoading(false);
                        },
                        error => {
                            this.editErrores = error.error;             
                            this.showErrors();
                            this.showLoading(false);
                        });     
            }else{                
                this.edit(this.modelToEdit, editContent);
            }
        }, (reason) => {  
            this.clearAndcloseErrors();                      
        });
    }

    validateEdit(){
        let areEditErrors = false;        
        this.clearAndcloseErrors();        
        
        if(this.modelToEdit.nombre == undefined || this.modelToEdit.nombre == ''){
            this.editErrores.push({ message: 'Nombre obligatorio'});
            areEditErrors = true;
        }
        
        if(areEditErrors){
            this.showEditErrors();
            return false;
        }

        return true;
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

    showEditErrors(){           
        this.areEditErrors = true;        
        this.showLoading(false);
        
        setTimeout(function() {
            this.clearAndcloseErrors();
        }.bind(this), 10000); 
    }

    clearAndcloseErrors(){
        this.errores = [];
        this.areErrors = false;
        this.editErrores = [];
        this.areEditErrors = false;                            
    }

    clearModel(){        
        this.model.idExpresionFacial1 = '';        
        this.model.nombre = '';
        this.modelToEdit.idExpresionFacial1 = '';
        this.modelToEdit.nombre = '';
    }
}