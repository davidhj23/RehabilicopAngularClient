import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from './user.service';
import { User } from './user';

@Component({
    selector: 'consultarUsuarios',
    templateUrl: 'consultarUsuarios.component.html',
})

export class ConsultarUsuariosComponent implements OnInit {       
    
    usuarios: User[] = [];
    temp: User[] = [];
    model: any = {};
    modelToEdit: any = {};

    loading = false;        
    rowsOnPage = 5;
    
    areErrors = false;
    errores: any[] = [];   

    constructor(
        private userService: UserService,
        private router: Router,
        private ngbModal: NgbModal) {
        let self = this;
    }

    ngOnInit() { 
        this.loadAllUsuarios();           
    }    

    private loadAllUsuarios() {     
        this.showLoading(true);   
        this.userService.getAll().subscribe(
            usuarios => {                                 
                this.usuarios = usuarios; 
                this.temp = this.usuarios;
                this.showLoading(false);
            },
            error => {        
                console.log(error);
                if(Array.isArray(error.error)){
                    this.errores = error.error;
                }else{
                    let errores = [];
                    errores.push(error.error);
                    this.errores = errores;
                } 
                this.showErrors();
                this.showLoading(false);
            });
    }

    filtrarTabla(event: any) { 
        const val = event.target.value.toLowerCase();

        // filter our data
        const temp = this.temp.filter(function(d) {
            return d.nombres.toLowerCase().indexOf(val) !== -1 || !val;
        }); 

        this.usuarios = temp;
    }

    new(){
        
    }

    edit(model: any) {            
        this.router.navigate(['/layout/seguridad/usuarios/editar', model.idUsuario]);
    }

    delete(idRol: string, content: any) {   
        this.clearAndcloseErrors();     
        this.ngbModal.open(content).result.then((result) => {
            this.showLoading(true);
            this.userService.delete(idRol)
                .subscribe(data => {                    
                    this.loadAllUsuarios();                    
                    this.showLoading(false);
                }, error => {       
                    if(Array.isArray(error.error)){
                        this.errores = error.error;
                    }else{
                        let errores = [];
                        errores.push(error.error);
                        this.errores = errores;
                    } 
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
}