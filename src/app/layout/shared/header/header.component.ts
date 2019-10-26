import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthenticationService } from '../../seguridad/usuarios/authentication.service';
import { UserService } from '../../seguridad/usuarios/user.service';

@Component({
    selector: 'dashboard-header',
    templateUrl: 'header.component.html',
})

export class HeaderComponent implements OnInit {
    
    loggedUser: string;

    constructor(private authenticationService: AuthenticationService,
                private router: Router,
                private http: HttpClient,
                private idle: Idle,
                private userService: UserService) {
        
    }

    ngOnInit() { 
        this.userService.getMe()
            .subscribe(
                data => {                                                             
                    this.loggedUser = `${data.nombres} ${data.apellidos}`; 
                },
                error => {
                });   
    }

    @Output() onCollapse: EventEmitter<any> = new EventEmitter();
    collapse() {
        this.onCollapse.emit(null);
    }
    
    cerrarSesion() {
        this.idle.stop();
        this.idle.ngOnDestroy();       

        this.authenticationService.logout();
        window.location.href = '/';
    }
}