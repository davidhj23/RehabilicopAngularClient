import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { User } from './user';

@Component({
    selector: 'restablecerPassword',
    templateUrl: 'restablecerPassword.component.html',
})

export class RestablecerPasswordComponent implements OnInit {       
    
    model: any = {}; 
    usuarios: User[] = [];  

    loading = false;        
    
    areErrors = false;
    errores: any[] = [];       

    constructor(
        private userService: UserService,
        private router: Router) {
        let self = this;
    }

    ngOnInit() {   
        this.loadAllUsuarios(); 
    }    

    private loadAllUsuarios() {     
        this.showLoading(true);   
        this.userService.getAll().subscribe(
            usuarios => {                 
                this.usuarios = usuarios;                 
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

        this.showLoading(true);    
        this.userService.restablecerPassword(this.model)
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

        if(this.model.idUsuario == ''){
            this.errores.push({ message: 'Seleccione un usuario'});
            areErrors = true;
        }

        if(this.model.newPassword == undefined || this.model.newPassword == '' ||
           this.model.repeatNewPassword == undefined || this.model.repeatNewPassword == ''){

            this.errores.push({ message: 'Todos los campos son obligatorios'});
            areErrors = true;
        }

        if(this.model.newPassword != this.model.repeatNewPassword){
            this.errores.push({ message: 'La nueva clave no es igual a repetir nueva clave'});
            areErrors = true;
        }

        if(this.model.newPassword.length < 6){
            this.errores.push({ message: 'La nueva clave debe tener al menos 6 caracteres'});
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
        this.model.idUsuario = '';        
        this.model.newPassword = '';        
        this.model.repeatNewPassword = '';   
    }
}