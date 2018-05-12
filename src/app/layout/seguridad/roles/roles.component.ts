import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Rol } from './rol';
import { RolService } from './rol.service';

@Component({
    selector: 'roles',
    templateUrl: 'roles.component.html',
})

export class RolesComponent implements OnInit {   
    
    roles: Rol[] = [];
    temp: Rol[] = [];

    rol: Rol = new Rol();
    rowsOnPage = 5;

    model: any = {};
    error = '';
    loading = false;        

    constructor(
        private rolService: RolService,
        private router: Router,
        private ngbModal: NgbModal) {
        let self = this;
    }

    ngOnInit() {        
        this.loadAllRoles();        
    }

    private loadAllRoles() {        
        this.rolService.getAll().subscribe(
            roles => { 
                this.roles = roles; 
                this.temp = this.roles;
            });
    }

    create() {
        this.showLoading(true);
        if(this.model.hiddenId == undefined){   
            this.rolService.create(this.model)
                .subscribe(
                    data => {
                        this.clearModel();
                        this.loadAllRoles();
                        this.showLoading(false);
                    },
                    error => {
                        this.showErrors(error);
                    });
        }else{        
            this.model.idRol = this.model.hiddenId;            
            this.rolService.update(this.model)
                .subscribe(
                    data => {
                        this.clearModel();
                        this.loadAllRoles();
                        this.showLoading(false);
                    },
                    error => {
                        this.showErrors(error);
                    });
        }
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
                    this.showErrors(error);
                })
        }, (reason) => {            
        });
    }

    showLoading(loading: boolean) {
        this.loading = loading;
    }

    showErrors(error: any){
        this.error = JSON.parse(error._body);                      
        this.showLoading(false);
        setTimeout(function() {
            this.error = '';                            
        }.bind(this), 5000); 
    }

    closeError() {
        this.error = '';
    }

    clearModel(){
        this.model.hiddenId = undefined;
        this.model.idRol = '';
        this.model.nombre = '';
    }

    filtrarTabla(event: any) { 
        const val = event.target.value.toLowerCase();

        // filter our data
        const temp = this.temp.filter(function(d) {
            return d.nombre.toLowerCase().indexOf(val) !== -1 || !val;
        }); 

        this.roles = temp;
    }
}