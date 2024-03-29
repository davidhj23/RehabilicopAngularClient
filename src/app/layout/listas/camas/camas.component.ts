import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Cama } from './cama';
import { CamaService } from './cama.service';
import { SedeService, Sede } from '../sedes';

@Component({
    selector: 'camas',
    templateUrl: 'camas.component.html',
})

export class CamasComponent implements OnInit {   
    
    camas: Cama[] = [];
    temp: Cama[] = [];
    model: any = {};
    modelToEdit: any = {};
    
    sedes: any[] = []; 
    idSede: string;   
    idSedeToEdit: string;    

    loading = false;        
    rowsOnPage = 5;
    
    areErrors = false;
    errores: any[] = [];   
    areEditErrors = false;
    editErrores: any[] = [];   

    constructor(
        private camaService: CamaService,
        private sedeService: SedeService,
        private router: Router,
        private ngbModal: NgbModal) {
        let self = this;
    }

    ngOnInit() {        
        this.loadAllCamas();        
    }

    private loadAllCamas() {     
        this.showLoading(true);   
        this.camaService.getAll()
            .subscribe(
                camas => { 
                    this.camas = camas; 
                    this.temp = this.camas;
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

        this.showLoading(true);    
        this.sedeService.getAll()
            .subscribe(
                data => {      
                    this.sedes = data;                  
                    this.clearModel();                    
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

        this.camas = temp;
    }

    create() {
        if(!this.validateCreate()) return;

        if(this.idSede != null){
            this.model.sede = new Sede();        
            this.model.sede.idSede = this.idSede;                      
        }

        this.showLoading(true);    
        this.camaService.create(this.model)
            .subscribe(
                data => {                        
                    this.clearModel();
                    this.idSede = '';
                    this.loadAllCamas();
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

        if(this.idSede == undefined || this.idSede == ''){
            this.errores.push({ message: 'Seleccione una sede'});
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
        this.idSedeToEdit = model.sede.idSede;        

        this.ngbModal.open(editContent).result.then((result) => {
            this.showLoading(true);      
            
            if(this.idSedeToEdit != null){
                this.modelToEdit.sede = new Sede();     
                this.modelToEdit.sede.idSede = this.idSedeToEdit;
            }

            if(this.validateEdit()){                                               
                this.camaService.update(this.modelToEdit)
                    .subscribe(
                        data => {
                            this.clearModel();
                            this.idSedeToEdit = '';
                            this.loadAllCamas();
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

        if(this.idSedeToEdit == undefined || this.idSedeToEdit == ''){
            this.editErrores.push({ message: 'Seleccione una sede'});
            areEditErrors = true;
        }
        
        if(areEditErrors){
            this.showEditErrors();
            return false;
        }

        return true;
    }

    delete(idCama: string, content: any) {   
        this.clearAndcloseErrors();   
        this.ngbModal.open(content).result.then((result) => {
            this.showLoading(true);
            this.camaService.delete(idCama)
                .subscribe(data => {                    
                    this.loadAllCamas();                    
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
        this.model = new Cama();
        this.modelToEdit = new Cama();        
    }
}