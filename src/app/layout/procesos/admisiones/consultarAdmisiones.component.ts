import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Admision } from './admision';
import { AdmisionService } from './admision.service';

@Component({
    selector: 'consultarAdmisiones',
    templateUrl: 'consultarAdmisiones.component.html',
})

export class ConsultarAdmisionesComponent implements OnInit {       
    
    admisiones: Admision[] = [];
    temp: Admision[] = [];
    model: any = {};
    modelToEdit: any = {};

    loading = false;        
    rowsOnPage = 5;
    
    areErrors = false;
    errores: any[] = [];   

    constructor(
        private admisionService: AdmisionService,
        private router: Router,
        private ngbModal: NgbModal) {
        let self = this;
    }

    ngOnInit() { 
        this.loadAllAdmisiones();           
    }    

    private loadAllAdmisiones() {     
        this.showLoading(true);   
        this.admisionService.getAll().subscribe(
            admisiones => {                                 
                this.admisiones = admisiones; 
                this.temp = this.admisiones;
                this.showLoading(false);
            },
            error => {                        
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
            return d.paciente.nombres.toLowerCase().indexOf(val) !== -1 || 
                   d.paciente.apellidos.toLowerCase().indexOf(val) !== -1 ||
                   d.paciente.identificacion.toLowerCase().indexOf(val) !== -1 || 
                   d.fechaDeRemision.toString().indexOf(val) || !val;
        }); 

        this.admisiones = temp;
    }

    edit(model: any) {            
        this.router.navigate(['/layout/procesos/admisiones/editar', model.idAdmision]);
    }

    delete(idAdmision: string, content: any) {   
        this.clearAndcloseErrors();     
        this.ngbModal.open(content).result.then((result) => {
            this.showLoading(true);
            this.admisionService.delete(idAdmision)
                .subscribe(data => {                    
                    this.loadAllAdmisiones();                    
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