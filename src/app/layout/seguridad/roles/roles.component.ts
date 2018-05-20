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
    areErrors = false;
    errores: any[] = [];
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
        this.showLoading(true);   
        this.rolService.getAll().subscribe(
            roles => { 
                this.roles = roles; 
                this.temp = this.roles;
                this.showLoading(false);
            },
            error => {                        
                this.errores = error.error;             
                this.showErrors();
                this.showLoading(false);
            });
    }

    create() {

        let areErrors = false;
        this.clearAndcloseErrors();        

        if(this.model.nombre == undefined || this.model.nombre == ''){
            this.errores.push({ message: 'Nombre obligatorio'});
            areErrors = true;
        }

        if(areErrors){
            this.showErrors();
            return;
        }

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
                        this.errores = error.error;             
                        this.showErrors();
                        this.showLoading(false);
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
                        this.errores = error.error;             
                        this.showErrors();
                        this.showLoading(false);
                    });
        }
    }     

    edit(model: any) {
        this.model.hiddenId = model.idRol;        
        this.model.nombre = model.nombre;
    }

    delete(idRol: string, content: any) {   
        this.clearAndcloseErrors();     
        this.ngbModal.open(content).result.then((result) => {
            this.showLoading(true);
            this.rolService.delete(idRol)
                .subscribe(data => {                    
                    this.loadAllRoles();                    
                    this.showLoading(false);
                }, error => {       
                    this.errores = error.error;             
                    this.showErrors();
                    this.showLoading(false);
                })
        }, (reason) => {            
        });
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