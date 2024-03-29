import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ViaIngreso } from './viaIngreso';
import { ViaIngresoService } from './viaIngreso.service';

@Component({
    selector: 'viaIngreso',
    templateUrl: 'viaIngreso.component.html',
})

export class ViaIngresoComponent implements OnInit {   
    
    viasIngresos: ViaIngreso[] = [];
    temp: ViaIngreso[] = [];
    model: any = {};
    modelToEdit: any = {};

    loading = false;        
    rowsOnPage = 5;
    
    areErrors = false;
    errores: any[] = [];   
    areEditErrors = false;
    editErrores: any[] = [];        

    constructor(
        private viaIngresoService: ViaIngresoService,
        private router: Router,
        private ngbModal: NgbModal) {
        let self = this;
    }

    ngOnInit() {        
        this.loadAllViaIngresos();        
    }

    private loadAllViaIngresos() {     
        this.showLoading(true);   
        this.viaIngresoService.getAll().subscribe(
            viasIngresos => { 
                console.log(viasIngresos)
                this.viasIngresos = viasIngresos; 
                this.temp = this.viasIngresos;
                this.showLoading(false);
            },
            error => {                        
                if(Array.isArray(error.error)){                         this.errores = error.error;                                  }else{                         let errores = [];                         errores.push(error.error);                         this.errores = errores;                                  }                
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

        this.viasIngresos = temp;
    }

      create() {
        if(!this.validateCreate()) return;

        this.showLoading(true);    
        this.viaIngresoService.create(this.model)
            .subscribe(
                data => {                        
                    this.clearModel();
                    this.loadAllViaIngresos();
                    this.showLoading(false);
                },
                error => {                        
                    if(Array.isArray(error.error)){                         this.errores = error.error;                                  }else{                         let errores = [];                         errores.push(error.error);                         this.errores = errores;                                  }                
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
        this.modelToEdit.idViaIngreso = model.idViaIngreso;     
        this.modelToEdit.nombre = model.nombre;     

        this.ngbModal.open(editContent).result.then((result) => {
            
            this.showLoading(true);      
            if(this.validateEdit()){                                               
                this.viaIngresoService.update(this.modelToEdit)
                    .subscribe(
                        data => {
                            this.clearModel();
                            this.loadAllViaIngresos();
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

    delete(idViaIngreso: string, content: any) {   
        this.clearAndcloseErrors();    
        this.ngbModal.open(content).result.then((result) => {
            this.showLoading(true);
            this.viaIngresoService.delete(idViaIngreso)
                .subscribe(data => {                    
                    this.loadAllViaIngresos();                    
                    this.showLoading(false);
                }, error => {       
                    if(Array.isArray(error.error)){                         this.errores = error.error;                                  }else{                         let errores = [];                         errores.push(error.error);                         this.errores = errores;                                  }                
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
        this.model.idViaIngreso = '';        
        this.model.nombre = '';
        this.modelToEdit.idViaIngreso = '';
        this.modelToEdit.nombre = '';
    }    
}