import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../_models/index';
import { UserService, AuthenticationService } from '../../_services/index';
import { VisibleGuard } from '../../_guards/index';

import {Idle, DEFAULT_INTERRUPTSOURCES} from '@ng-idle/core';
import {Keepalive} from '@ng-idle/keepalive';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
    selector: 'dashboard-header',
    templateUrl: 'header.component.html',
})

export class HeaderComponent implements OnInit {
    
    constructor(public userService: UserService, 
                private visibleGuard: VisibleGuard,
                private authenticationService: AuthenticationService,
                private router: Router,
                private http: HttpClient,
                private idle: Idle) {
        
    }

    ngOnInit() {        
    }

    @Output() onCollapse: EventEmitter<any> = new EventEmitter();
    collapse() {
        this.onCollapse.emit(null);
    }
    
    cerrarSesion() {
        this.idle.stop();
        this.idle.ngOnDestroy();       

        this.authenticationService.logout();
        window.location.href = '/login';
    }
}