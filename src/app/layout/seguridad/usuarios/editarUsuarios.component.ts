import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { User } from './user';
import { RolService, Rol } from '../roles';
import { TipoDocumentoService, TipoDocumento } from '../../listas/tipos-documentos';
import { Validator } from '../../../_utils/validators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'editarUsuarios',
    templateUrl: 'editarUsuarios.component.html',
})

export class EditarUsuariosComponent implements OnInit {       
    
    currentUserId: string;

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
        private rolService: RolService,
        private route: ActivatedRoute) {

        this.model = new User();

        this.route.params.subscribe( 
            params => {
                this.currentUserId = params['id'];
            }
        );
    }

    ngOnInit() {    
        this.fillSelects();

        this.showLoading(true);    
        this.userService.getById(this.currentUserId)
            .subscribe(
                data => {                        
                    //this.model = data;
                    this.model.identificacion = data.identificacion;
                    console.log(this.model)
                    this.clearModel();                    
                    this.showLoading(false);
                },
                error => {                        
                    this.errores = error.error;             
                    this.showErrors();
                    this.showLoading(false);
                });      
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
        this.userService.update(this.model)
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

        if(this.idTipoDocumento == undefined || this.idTipoDocumento == ''){
            this.errores.push({ message: 'Seleccione un tipo de documento'});
            areErrors = true;
        }

        if(this.model.identificacion == undefined || this.model.identificacion == ''){
            this.errores.push({ message: 'Ingrese la cédula'});
            areErrors = true;
        }

        if(this.model.nombres == undefined || this.model.nombres == ''){
            this.errores.push({ message: 'Ingrese nombres'});
            areErrors = true;
        }

        if(this.model.apellidos == undefined || this.model.apellidos == ''){
            this.errores.push({ message: 'Ingrese apellidos'});
            areErrors = true;
        }

        if(this.idRol == undefined || this.idRol == ''){
            this.errores.push({ message: 'Seleccione un rol'});
            areErrors = true;
        }

        if(this.model.email == undefined || this.model.email == ''){
            this.errores.push({ message: 'Ingrese un email'});
            areErrors = true;
        }
        else if(!Validator.validateEmail(this.model.email)){
            this.errores.push({ message: 'Ingrese un email válido'});
            areErrors = true;
        }        

        if(areErrors){
            this.showErrors();
            return false;
        }

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