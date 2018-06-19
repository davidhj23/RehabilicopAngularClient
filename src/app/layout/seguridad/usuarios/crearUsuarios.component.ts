import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { User } from './user';
import { RolService, Rol } from '../roles';
import { TipoDocumentoService, TipoDocumento, TiposDocumentosComponent } from '../../listas/tipos-documentos';

@Component({
    selector: 'crearUsuarios',
    templateUrl: 'crearUsuarios.component.html',
})

export class CrearUsuariosComponent implements OnInit {       
    
    model: User;       
    tiposDocumentos: any[] = [];  
    roles: any[] = [];  

    idTipoDocumento: string;
    idRol: string;

    loading = false;        
    
    areErrors = false;
    errores: any[] = [];       

    constructor(
        private userService: UserService,
        private tipoDocumentoService: TipoDocumentoService,
        private rolService: RolService) {

        this.model = new User();
    }

    ngOnInit() {    
        this.fillSelects();
    }    

    fillSelects(){
        this.showLoading(true);    
        this.tipoDocumentoService.getAll()
            .subscribe(
                data => {      
                    this.tiposDocumentos = data;                  
                    this.clearModel();                    
                    this.showLoading(false);
                },
                error => {                        
                    this.errores = error.error;             
                    this.showErrors();
                    this.showLoading(false);
                });   

        this.showLoading(true);    
        this.rolService.getAll()
            .subscribe(
                data => {
                    this.roles = data;                        
                    this.clearModel();                    
                    this.showLoading(false);
                },
                error => {                        
                    this.errores = error.error;             
                    this.showErrors();
                    this.showLoading(false);
                });   
    }

    guardar() {
        if(!this.validateCreate()) return;

        this.model.tipoDocumento = new TipoDocumento();
        this.model.roles = [];        

        let tipoDoc = new TipoDocumento();
        tipoDoc.idTipoDocumento = this.idTipoDocumento;          
        this.model.tipoDocumento = tipoDoc;        

        let rol = new Rol();
        rol.idRol = this.idRol;
        this.model.roles.push(rol);        

        this.showLoading(true);    
        this.userService.create(this.model)
            .subscribe(
                data => {                        
                    this.clearModel();                    
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


        return true;
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
        this.model = new User();
    }
}