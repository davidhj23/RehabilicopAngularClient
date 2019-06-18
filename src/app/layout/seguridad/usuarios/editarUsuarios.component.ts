import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { User } from './user';
import { RolService, Rol } from '../roles';
import { TipoDocumentoService, TipoDocumento } from '../../listas/tipos-documentos';
import { Util } from '../../../_utils/util';
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
                    this.model = data;                           
                    this.idTipoDocumento = this.model.tipoDocumento.idTipoDocumento;
                    this.idRol = this.model.roles[0].idRol;  
                    if(this.imageSrc != undefined 
                        && this.imageSrc != null 
                        && this.imageSrc != ''){                
                        this.imageSrc = 'data:image/png;base64,' + this.model.firma;                  
                    }
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

    fillSelects(){
        this.showLoading(true);    
        this.tipoDocumentoService.getAll()
            .subscribe(
                data => {      
                    this.tiposDocumentos = data;                                                       
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
        this.rolService.getAll()
            .subscribe(
                data => {
                    this.roles = data;                                            
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
        
        if(this.imageSrc != undefined 
            && this.imageSrc != null 
            && this.imageSrc != ''){
            this.model.firma = this.imageSrc.split(',')[1];
        }

        this.showLoading(true);               
        this.userService.update(this.model)
            .subscribe(
                data => {                        
                    this.model = data;                    
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

        if(this.model.email != undefined && this.model.email != ''){
            if(!Util.validateEmail(this.model.email)){
                this.errores.push({ message: 'Ingrese un email válido'});
                areErrors = true;
            }
        }

        if(areErrors){
            this.showErrors();
            return false;
        }

        return true;
    }
    
    private imageSrc: string = '';

    handleInputChange(e: any) {
        
        var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
        var pattern = /image-*/;
        var reader = new FileReader();
        
        if (!file.type.match(pattern)) {
           console.log('invalid format');
           return;
        }

        reader.onload = this._handleReaderLoaded.bind(this);
        reader.readAsDataURL(file);
    }

    _handleReaderLoaded(e: any) {
        let reader = e.target;
        this.imageSrc = reader.result;
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