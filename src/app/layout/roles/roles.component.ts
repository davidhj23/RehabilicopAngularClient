import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Rol, ErrorMessage } from '../../_models';
import { Router } from '@angular/router';
import { RolService, AlertService } from '../../_services';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'roles',
    templateUrl: 'roles.component.html',
})

export class RolesComponent implements OnInit {   
    
    roles: Rol[] = [];
    rol: Rol = new Rol();
    errorMessage: ErrorMessage[] = [];
    rowsOnPage = 5;

    model: any = {};
    error = '';
    loading = false;        

    constructor(
        private rolService: RolService,
        private router: Router,
        private alertService: AlertService,
        private ngbModal: NgbModal) {
        let self = this;
    }

    ngOnInit() {        
        this.loadAllRoles();        
    }

    private loadAllRoles() {        
        this.rolService.getAll().subscribe(roles => { this.roles = roles; });
    }

    create() {
        this.showLoading(true);
        if(this.model.hiddenId == undefined){           
            this.rolService.create(this.model)
                .subscribe(
                    data => {
                        this.model.nombre = '';
                        this.loadAllRoles();
                        this.showLoading(false);
                    },
                    error => {
                        this.error = error;
                        this.showLoading(false);
                        setTimeout(function() {
                            this.error = '';                            
                        }.bind(this), 5000);
                    });
        }
        else{            
            this.model.idRol = this.model.hiddenId;
            this.rolService.update(this.model)
                .subscribe(
                    data => {
                        this.model.hiddenId = '';
                        this.model.nombre = '';
                        this.loadAllRoles();
                        this.showLoading(false);
                    },
                    error => {
                        this.error = error;                    
                        this.showLoading(false);
                        setTimeout(function() {
                            this.error = '';                            
                        }.bind(this), 5000);
                    });
        }
    } 

    closeError() {
        this.error = '';
    }

    edit(id: number, nombre: string) {
        this.model.hiddenId = id;
        this.model.nombre = nombre;
    }

    delete(id: number, content: any) {        
        this.ngbModal.open(content).result.then((result) => {
            this.showLoading(true);
            this.rolService.delete(id)
                .subscribe(data => {                    
                    this.loadAllRoles();                    
                    this.showLoading(false);
                }, error => {                    
                    this.error = JSON.parse(error._body);                      
                    this.showLoading(false);
                    setTimeout(function() {
                        this.error = '';                            
                    }.bind(this), 5000);                  
                })
        }, (reason) => {            
        });
    }

    showLoading(loading: boolean) {
        this.loading = loading;
    }
}