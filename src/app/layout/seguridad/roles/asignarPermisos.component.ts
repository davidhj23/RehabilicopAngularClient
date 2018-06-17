import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { RolService } from './rol.service';

@Component({
    selector: 'asignarPermisos',
    templateUrl: 'asignarPermisos.component.html',
})

export class AsignarPermisosComponent implements OnInit {       
    
    model: any = {}; 

    loading = false;        
    
    areErrors = false;
    errores: any[] = [];       

    constructor(
        private rolService: RolService,
        private router: Router) {
        let self = this;
    }

    ngOnInit() {   
    }    
}