import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { EvolucionService } from './evolucion.service';
import { AseguradoraService } from '../../listas/aseguradoras';
import { ParametrizarEvolucionService } from '../../configuracion/evoluciones';

@Component({
    selector: 'auditoria',
    templateUrl: 'auditoria.component.html',
})

export class AuditoriaComponent implements OnInit {   
    
    aseguradoras: any[] = []; 

    model: any;

    loading = false;        
    
    areErrors = false;
    errores: any[] = [];   

    constructor(
        private parametrizarEvolucionService: ParametrizarEvolucionService,        
        private evolucionService: EvolucionService,        
        private aseguradoraService: AseguradoraService,
        private router: Router,
        private ngbModal: NgbModal) {
           this.model = {};
    }

    ngOnInit() {    
        this.fillSelects();
    }    

    private fillSelects(){
        this.showLoading(true);    
        this.aseguradoraService.getAseguradorasAuditor()
            .subscribe(
                data => {      
                    this.aseguradoras = data;                    
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

    consultar(){
        if(!this.validateCreate()) return;        

        this.showLoading(true);    
        this.parametrizarEvolucionService.getAllByAnioAndMes(            
            this.model.anio,
            this.model.mes)
            .subscribe(
                data => {      
                    console.log(data);                    
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

        this.showLoading(true);    
        this.evolucionService.getAllEvoluciones(
            this.model.aseguradora.idAseguradora,
            this.model.anio,
            this.model.mes)
            .subscribe(
                data => {      
                    console.log(data);                    
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

    validateCreate(){
        let areErrors = false;
        this.clearAndcloseErrors();        

        if(this.model.anio == undefined || this.model.anio == ''){
            this.errores.push({ message: 'Seleccione un año'});
            areErrors = true;
        }

        if(this.model.mes == undefined || this.model.mes == ''){
            this.errores.push({ message: 'Seleccione un mes'});
            areErrors = true;
        }

        if(this.model.aseguradora == undefined || this.model.aseguradora == null){
            this.errores.push({ message: 'Seleccione un aseguradora'});
            areErrors = true;
        }

        if(areErrors){
            this.showErrors();
            return false;
        }

        return true;
    }

    showLoading(loading: boolean) {
        this.loading = loading;
    }

    showErrors(){   
        this.areErrors = true;        
        this.showLoading(false);
        window.scroll(0,0);
        setTimeout(function() {
            this.clearAndcloseErrors();
        }.bind(this), 10000); 
    }

    clearAndcloseErrors(){
        this.errores = [];
        this.areErrors = false;        
    }

    clearModel(){        
        //this.model = new Admision();        
    }
}