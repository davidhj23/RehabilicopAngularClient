import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AppComponent } from '../app.component';

import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthenticationService } from '../layout/seguridad/usuarios/authentication.service';
import { UserService } from '../layout/seguridad/usuarios/user.service';

@Component({
    moduleId: module.id.toString(),
    selector: "login",
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    
    model: any = {};
    loading = false;
    returnUrl: string;

    error = '';

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,                
        private idle: Idle) {}

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/layout';
    }

    login() {
        this.error = '';
        this.loading = true;

        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                data => {

                    localStorage.setItem('jwtToken', JSON.stringify(data));

                    this.userService.getPermissions().subscribe(data => { 
                        
                        localStorage.setItem('permissions', JSON.stringify(data)); 

                        this.idle.setIdle(1);
                        this.idle.setTimeout(600);
                        this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
                
                        this.idle.onTimeoutWarning.subscribe((countdown: number) => {
                            console.log("onTimeoutWarning" + countdown)
                        });

                        this.idle.onTimeout.subscribe(() => {
                            this.idle.stop();
                            this.idle.ngOnDestroy();       
                            
                            this.authenticationService.logout();                            
                            window.location.href = '/';           
                        });
                
                        this.idle.watch();
                        this.router.navigate([this.returnUrl]);                    
                    });
                },
                error => {
                    this.error = 'Usuario y/o clave incorrecta'                    
                    this.loading = false;
                });
    }    
}
