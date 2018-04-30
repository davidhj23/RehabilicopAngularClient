import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, UserService } from '../_services/index';

import { Rol } from '../_models/index';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'register.component.html',
})

export class RegisterComponent {
    model: any = {};
    loading = false;

    public roles: Rol[] = [];
    public rol: Rol = new Rol();

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { }

    register() {
        this.loading = true; 
        
        this.userService.register(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Registro exitoso', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
