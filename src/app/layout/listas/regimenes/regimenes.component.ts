import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Regimen } from './regimen';
import { RegimenService } from './regimen.service';

@Component({
    selector: 'regimenes',
    templateUrl: 'regimenes.component.html',
})

export class RegimenesComponent implements OnInit {   
    
    regimenes: Regimen[] = [];
    temp: Regimen[] = [];
    model: any = {};
    modelToEdit: any = {};

    loading = false;        
    rowsOnPage = 5;
    
    areErrors = false;
    errores: any[] = [];   
    areEditErrors = false;
    editErrores: any[] = [];          

    constructor(
        private regimenService: RegimenService,
        private router: Router,
        private ngbModal: NgbModal) {
        let self = this;
    }

    ngOnInit() {        
        this.loadAllRegimenes();        
    }

    private loadAllRegimenes() {     
        this.showLoading(true);   
        this.regimenService.getAll().subscribe(
            regimenes => { 
                this.regimenes = regimenes; 
                this.temp = this.regimenes;
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

        this.regimenes = temp;
    }

    create() {
        if(!this.validateCreate()) return;

        this.showLoading(true);    
        this.regimenService.create(this.model)
            .subscribe(
                data => {                        
                    this.clearModel();
                    this.loadAllRegimenes();
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
        this.modelToEdit.idRegimen = model.idRegimen;     
        this.modelToEdit.nombre = model.nombre;     

        this.ngbModal.open(editContent).result.then((result) => {
            
            this.showLoading(true);      
            if(this.validateEdit()){                                               
                this.regimenService.update(this.modelToEdit)
                    .subscribe(
                        data => {
                            this.clearModel();
                            this.loadAllRegimenes();
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

    delete(idRegimen: string, content: any) {   
        this.clearAndcloseErrors();  
        this.ngbModal.open(content).result.then((result) => {
            this.showLoading(true);
            this.regimenService.delete(idRegimen)
                .subscribe(data => {                    
                    this.loadAllRegimenes();                    
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
        this.model.idRegimen = '';        
        this.model.nombre = '';
        this.modelToEdit.idRegimen = '';
        this.modelToEdit.nombre = '';
    }  
}