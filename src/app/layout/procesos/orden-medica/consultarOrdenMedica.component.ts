import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { OrdenMedica } from './ordenMedica';
import { OrdenMedicaService } from './ordenMedica.service';

@Component({
    selector: 'consultarOrdenMedica',
    templateUrl: 'consultarOrdenMedica.component.html',
})

export class ConsultarOrdenMedicaComponent implements OnInit {   
    
    ordenesMedicas: OrdenMedica[] = [];
    temp: OrdenMedica[] = [];  

    loading = false;        
    rowsOnPage = 5;
    
    areErrors = false;
    errores: any[] = []; 

    constructor(
        private ordenMedicaService: OrdenMedicaService,        
        private router: Router,
        private ngbModal: NgbModal) {
            
    }

    ngOnInit() { 
        this.loadOrdenesMedicas();                       
    }

    private loadOrdenesMedicas() {     
        this.showLoading(true);    
        this.ordenMedicaService.getAll()
            .subscribe(
                data => {    
                    this.ordenesMedicas = data;                    
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

    edit(model: any) {            
        this.router.navigate(['/layout/procesos/historias/editar-orden-medica', model.idOrdenMedica]);
    }

    delete(idOrdenMedica: string, content: any) {   
        this.clearAndcloseErrors();     
        this.ngbModal.open(content).result.then((result) => {
            this.showLoading(true);
            this.ordenMedicaService.delete(idOrdenMedica)
                .subscribe(data => {                    
                    this.loadOrdenesMedicas();                    
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