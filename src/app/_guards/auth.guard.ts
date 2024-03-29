﻿import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AppComponent } from '../app.component';
import { ToastyService } from 'ng2-toasty';
import { Observable } from "rxjs/Observable";
import { UserService } from '../layout/seguridad/usuarios/user.service';

@Injectable()
export class AuthGuard implements CanActivate {    

    constructor(private router: Router,
        private userService: UserService,
        private toastyService: ToastyService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('jwtToken')) {            
            let permissions = route.data["permission"] as Array<string>;  
            if(permissions.length){
                let result = this.userService.validatePermission(permissions[0]);
                if(result == true){
                    return true;
                }else{
                    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
                    return false;
                }
            }else{
                this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});            
            }
        }else{
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});            
        }      
    }
}