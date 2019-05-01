import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { RolService } from './rol.service';
import { PermisoService } from '../permisos/permiso.service';
import { PermisoActual } from '../permisos/permisoActual';

@Component({
    selector: 'asignarPermisos',
    templateUrl: 'asignarPermisos.component.html',
})

export class AsignarPermisosComponent implements OnInit {       
    
    model: any = {}; 

    roles: any[] = [];  
    
    permisosActuales: any[] = [];  
    temp: any[] = [];  

    idRole: string;

    loading = false;       
    rowsOnPage = 50; 
    
    areErrors = false;
    errores: any[] = [];       

    constructor(
        private rolService: RolService,
        private permisoService: PermisoService,
        private router: Router) {
        let self = this;
    }

    ngOnInit() {   
        this.fillSelects();        
    }  
    
    fillSelects(){
        this.showLoading(true);    
        this.rolService.getAll()
            .subscribe(
                data => {
                    this.roles = data;                                            
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

    getPermisos(idRol: string){
        this.idRole = idRol;
        this.showLoading(true);    
        this.permisoService.getAll()
            .subscribe(
                per => {                    
                    this.rolService.getPermisosActualesByIdRol(idRol)
                        .subscribe(
                            perAct => {      
                                
                                this.permisosActuales = [];

                                per.forEach((element: any) => {
                                    let permisoActual = new PermisoActual();
                                    permisoActual.idPermiso = element.idPermiso;
                                    permisoActual.nombre = element.nombre.replace('ROLE_', '');                        
            
                                    perAct.forEach((x: any) => {
                                        if(permisoActual.idPermiso == x.idPermiso){
                                            permisoActual.seleccionado = true;
                                        }
                                    });

                                    this.permisosActuales.push(permisoActual);                                        
                                }); 
                                
                                this.temp = this.permisosActuales;
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

    asignar(permiso: any){
        if(permiso.seleccionado){
            this.showLoading(true);    
            this.rolService.createPermiso(this.idRole, permiso)
            .subscribe(
                data => {                                                                
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
        }else{ 
            this.showLoading(true);    
            this.rolService.deletePermiso(this.idRole, permiso)
            .subscribe(
                data => {                                                                
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
        
    }

    filtrarTabla(event: any) { 
        const val = event.target.value.toLowerCase();

        // filter our data
        const temp = this.temp.filter(function(d) {
            return d.nombre.toLowerCase().indexOf(val) !== -1 || !val;
        }); 

        this.permisosActuales = temp;
    }
}