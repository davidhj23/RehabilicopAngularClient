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
    model: any = {};
    modelToEdit: any = {};

    loading = false;        
    rowsOnPage = 5;
    
    areErrors = false;
    errores: any[] = [];   
    areEditErrors = false;
    editErrores: any[] = [];         

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
                if(Array.isArray(error.error)){
                    this.errores = error.error;
                }else{
                    let errores = [];
                    errores.push(error.error);
                    this.errores = errores;
                } 
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

        this.expresionFacial2s = temp;
    }

    create() {
        if(!this.validateCreate()) return;

        this.showLoading(true);    
        this.expresionFacial2Service.create(this.model)
            .subscribe(
                data => {                        
                    this.clearModel();
                    this.loadAllExpresionFacial2s();
                    this.showLoading(false);
                },
                error => {                        
                    if(Array.isArray(error.error)){
                        this.errores = error.error;
                    }else{
                        let errores = [];
                        errores.push(error.error);
                        this.errores = errores;
                    } 
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
        this.modelToEdit.idExpresionFacial2 = model.idExpresionFacial2;     
        this.modelToEdit.nombre = model.nombre;     

        this.ngbModal.open(editContent).result.then((result) => {
            
            this.showLoading(true);      
            if(this.validateEdit()){                                               
                this.expresionFacial2Service.update(this.modelToEdit)
                    .subscribe(
                        data => {
                            this.clearModel();
                            this.loadAllExpresionFacial2s();
                            this.showLoading(false);
                        },
                        error => {
                            if(Array.isArray(error.error)){
                                this.editErrores = error.error;
                            }else{
                                let errores = [];
                                errores.push(error.error);
                                this.editErrores = errores;
                            } 
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

    delete(idExpresionFacial2: string, content: any) {   
        this.clearAndcloseErrors();  
        this.ngbModal.open(content).result.then((result) => {
            this.showLoading(true);
            this.expresionFacial2Service.delete(idExpresionFacial2)
                .subscribe(data => {                    
                    this.loadAllExpresionFacial2s();                    
                    this.showLoading(false);
                }, error => {       
                    if(Array.isArray(error.error)){
                        this.errores = error.error;
                    }else{
                        let errores = [];
                        errores.push(error.error);
                        this.errores = errores;
                    } 
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
        this.model.idExpresionFacial2 = '';        
        this.model.nombre = '';
        this.modelToEdit.idExpresionFacial2 = '';
        this.modelToEdit.nombre = '';
    }
}