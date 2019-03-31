import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Epicrisis } from './epicrisis';
import { EpicrisisService } from './epicrisis.service';

@Component({
    selector: 'consultarEpicrisis',
    templateUrl: 'consultarEpicrisis.component.html',
})

export class ConsultarEpicrisisComponent implements OnInit {   
    
    listaEpicrisis: Epicrisis[] = [];
    temp: Epicrisis[] = [];  

    loading = false;        
    rowsOnPage = 5;
    
    areErrors = false;
    errores: any[] = []; 

    constructor(
        private epicrisisService: EpicrisisService,        
        private router: Router,
        private ngbModal: NgbModal) {
            
    }

    ngOnInit() { 
        this.loadEpicrisis();                       
    }

    private loadEpicrisis() {     
        this.showLoading(true);    
        this.epicrisisService.getAll()
            .subscribe(
                data => {    
                    this.listaEpicrisis = data;                    
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
        this.router.navigate(['/layout/procesos/historias/editar-epicrisis', model.idEpicrisis]);
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