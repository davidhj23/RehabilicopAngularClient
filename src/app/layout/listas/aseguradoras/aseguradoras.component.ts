import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router, UrlSegment } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Aseguradora } from './aseguradora';
import { AseguradoraService } from './aseguradora.service';
import { User } from '../../seguridad/usuarios/user';
import { UserService } from '../../seguridad/usuarios/user.service';
import { connectableObservableDescriptor } from 'rxjs/observable/ConnectableObservable';

@Component({
    selector: 'aseguradoras',
    templateUrl: 'aseguradoras.component.html',
})

export class AseguradorasComponent implements OnInit {   
    
    aseguradoras: Aseguradora[] = [];
    temp: Aseguradora[] = [];
    model = new Aseguradora();
    modelToEdit = new Aseguradora();

    auditor: User;
    auditorToEdit: User;

    auditores: User[] = [];

    private selectUndefinedOptionValue: any;

    loading = false;        
    rowsOnPage = 5;
    
    areErrors = false;
    errores: any[] = [];   
    areEditErrors = false;
    editErrores: any[] = [];   

    constructor(
        private aseguradoraService: AseguradoraService,
        private usuarioService: UserService,
        private router: Router,
        private ngbModal: NgbModal) {
        
    }

    ngOnInit() {   
        this.fillSelects();     
        this.loadAllAseguradoras();        
    }

    private fillSelects(){
        this.showLoading(true);    
        this.usuarioService.getAllAuditores()
            .subscribe(
                data => {      
                    this.auditores = data;                  
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

    private loadAllAseguradoras() {     
        this.showLoading(true);   
        this.aseguradoraService.getAll()
            .subscribe(
                aseguradoras => { 
                    aseguradoras.forEach(function(element: Aseguradora) {
                        if(element.auditor == null)
                            element.auditor = new User();
                    });
                    this.aseguradoras = aseguradoras; 
                    this.temp = this.aseguradoras;
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

        this.aseguradoras = temp;
    }

    create() {
        if(!this.validateCreate()) return;        
        this.model.auditor = (this.auditor != undefined && this.auditor.idUsuario != undefined) ? this.auditor : null;
        this.showLoading(true);    
        this.aseguradoraService.create(this.model)
            .subscribe(
                data => {                        
                    this.clearModel();
                    this.loadAllAseguradoras();
                    this.auditor = new User();
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

    edit(model: any, auditor: any, editContent: any) {            
        this.modelToEdit.idAseguradora = model.idAseguradora;     
        this.modelToEdit.nombre = model.nombre;                             
        this.auditorToEdit = auditor;  

        this.ngbModal.open(editContent).result.then((result) => {            
            this.showLoading(true);      
            if(this.validateEdit()){                                         
                this.modelToEdit.auditor = (this.auditorToEdit.idUsuario != undefined) ? this.auditorToEdit : null;                    
                this.aseguradoraService.update(this.modelToEdit)
                    .subscribe(
                        data => {
                            this.clearModel();
                            this.loadAllAseguradoras();
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
                this.edit(this.modelToEdit, auditor, editContent);
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

    delete(idAseguradora: string, content: any) {   
        this.clearAndcloseErrors();   
        this.ngbModal.open(content).result.then((result) => {
            this.showLoading(true);
            this.aseguradoraService.delete(idAseguradora)
                .subscribe(data => {                    
                    this.loadAllAseguradoras();                    
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
        this.model.idAseguradora = '';        
        this.model.nombre = '';
        this.model.auditor = new User();
        this.modelToEdit.idAseguradora = '';
        this.modelToEdit.nombre = '';
        this.modelToEdit.auditor = new User();
    }
}