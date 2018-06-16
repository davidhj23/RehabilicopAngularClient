import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { User } from './user';

@Component({
    selector: 'crearUsuarios',
    templateUrl: 'crearUsuarios.component.html',
})

export class CrearUsuariosComponent implements OnInit {       
    
    model: User;    

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