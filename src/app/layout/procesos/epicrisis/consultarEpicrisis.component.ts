import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Epicrisis } from './epicrisis';
import { EpicrisisService } from './epicrisis.service';
import { Util } from '../../../_utils';

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
                    this.temp = this.listaEpicrisis;                    
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

    filtrarTabla(event: any) { 
        const val = event.target.value.toLowerCase();

        // filter our data
        const temp = this.temp.filter(function(d) {                        
            return d.historia.admision.paciente.nombres.toLowerCase().indexOf(val) !== -1 || 
                   d.historia.admision.paciente.apellidos.toLowerCase().indexOf(val) !== -1 ||
                   d.historia.admision.paciente.identificacion.toLowerCase().indexOf(val) !== -1 || 
                   Util.formattedDate(d.fechaDeIngreso).indexOf(val) !== -1 || !val;
        }); 

        this.listaEpicrisis = temp;
    }
}