import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Cie10 } from './cie10';
import { Cie10Service } from './cie10.service';

@Component({
    selector: 'cie10s',
    templateUrl: 'cie10s.component.html',
})

export class Cie10sComponent implements OnInit {   
    
    cie10s: Cie10[] = [];
    temp: Cie10[] = [];
    model: any = {};
    modelToEdit: any = {};

    loading = false;        
    rowsOnPage = 5;
    
    areErrors = false;
    errores: any[] = [];   
    areEditErrors = false;
    editErrores: any[] = [];       

    constructor(
        private cie10Service: Cie10Service,
        private router: Router,
        private ngbModal: NgbModal) {
        let self = this;
    }

    ngOnInit() {        
        this.loadAllCie10s();        
    }

    private loadAllCie10s() {     
        this.showLoading(true);   
        this.cie10Service.getAll().subscribe(
            cie10s => { 
                this.cie10s = cie10s; 
                this.temp = this.cie10s;
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
            return d.nombre.toLowerCase().indexOf(val) !== -1 || 
                   d.codigo.toLowerCase().indexOf(val) !== -1 ||  !val;
        }); 

        this.cie10s = temp;
    }

    create() {
        if(!this.validateCreate()) return;

        this.showLoading(true);    
        this.cie10Service.create(this.model)
            .subscribe(
                data => {                        
                    this.clearModel();
                    this.loadAllCie10s();
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

        if(this.model.codigo == undefined || this.model.codigo == ''){
            this.errores.push({ message: 'Código obligatorio'});
            areErrors = true;
        }

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
        this.modelToEdit.idCie10 = model.idCie10;     
        this.modelToEdit.codigo = model.codigo;
        this.modelToEdit.nombre = model.nombre;     

        this.ngbModal.open(editContent).result.then((result) => {
            
            this.showLoading(true);      
            if(this.validateEdit()){                                               
                this.cie10Service.update(this.modelToEdit)
                    .subscribe(
                        data => {
                            this.clearModel();
                            this.loadAllCie10s();
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
        
        if(this.modelToEdit.codigo == undefined || this.modelToEdit.codigo == ''){
            this.editErrores.push({ message: 'Código obligatorio'});
            areEditErrors = true;
        }

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

    delete(idCie10: string, content: any) {   
        this.clearAndcloseErrors();
        this.ngbModal.open(content).result.then((result) => {
            this.showLoading(true);
            this.cie10Service.delete(idCie10)
                .subscribe(data => {                    
                    this.loadAllCie10s();                    
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
        this.model.idCie10 = '';        
        this.model.codigo = '';        
        this.model.nombre = '';
        this.modelToEdit.idCie10 = '';
        this.modelToEdit.codigo = '';        
        this.modelToEdit.nombre = '';
    }
}