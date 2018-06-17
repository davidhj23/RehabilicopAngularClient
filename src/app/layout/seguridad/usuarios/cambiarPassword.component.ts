import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Component({
    selector: 'cambiarPassword',
    templateUrl: 'cambiarPassword.component.html',
})

export class CambiarPasswordComponent implements OnInit {       
    
    model: any = {};    

    loading = false;        
    
    areErrors = false;
    errores: any[] = [];       

    constructor(
        private userService: UserService,
        private router: Router) {
        let self = this;
    }

    ngOnInit() {    
    }    

    guardar() {
        if(!this.validateCreate()) return;

        this.showLoading(true);    
        this.userService.changePassword(this.model)
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

        if(this.model.currentPassword == undefined || this.model.currentPassword == '' ||
           this.model.newPassword == undefined || this.model.newPassword == '' ||
           this.model.repeatNewPassword == undefined || this.model.repeatNewPassword == ''){

            this.errores.push({ message: 'Todos los campos son obligatorios'});
            areErrors = true;
        }

        if(this.model.newPassword != this.model.repeatNewPassword){
            this.errores.push({ message: 'La nueva clave no es igual a repetir nueva clave'});
            areErrors = true;
        }

        if(this.model.newPassword == undefined || this.model.newPassword.length < 6){
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
        this.model.currentPassword = '';        
        this.model.newPassword = '';        
        this.model.repeatNewPassword = '';   
    }
}