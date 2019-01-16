import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ParametrizacionEvolucion } from './parametrizacionEvolucion';
import { Util } from '../../../_utils';
import { ParametrizarEvolucionService } from './parametrizarEvolucion.service';

@Component({
    selector: 'parametrizarEvoluciones',
    templateUrl: 'parametrizarEvoluciones.component.html',
})

export class ParametrizarEvolucionesComponent implements OnInit {   

    model: ParametrizacionEvolucion;   
    tiposEvoluciones: any[] = []; 
    parametrizacionEvoluciones: ParametrizacionEvolucion[] = [];
    temp: ParametrizacionEvolucion[] = [];

    loading = false;   
    rowsOnPage = 50; 
    
    fecha: any;
    
    areErrors = false;
    errores: any[] = [];       

    constructor(private parametrizarEvolucionService: ParametrizarEvolucionService,
        private ngbModal: NgbModal) {
        this.model = new ParametrizacionEvolucion();
    }

    ngOnInit() {
        this.fillSelects();
        this.loadTable();
    }

    fillSelects(){      
        this.showLoading(true);    
        this.parametrizarEvolucionService.getAllTiposEvoluciones()
            .subscribe(
                data => {      
                    this.tiposEvoluciones = data;                    
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

    loadTable(){
        this.showLoading(true);    
        this.parametrizarEvolucionService.getAll()
            .subscribe(
                data => {   
                    this.parametrizacionEvoluciones = data;    
                    this.temp = data;    
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

    create(){
        if(!this.validateCreate()) return;
        
        this.model.fecha = new Date(Number(this.fecha.year), Number(this.fecha.month) - 1, Number(this.fecha.day)) 
        
        this.showLoading(true);    
        this.parametrizarEvolucionService.create(this.model)
            .subscribe(
                data => {                                                                
                    this.showLoading(false);
                    this.loadTable();
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
        
        if(this.fecha == undefined || this.fecha == null){
            this.errores.push({ message: 'Ingrese una fecha'});
            areErrors = true;
        }

        if(this.model.tipoEvolucion == undefined || this.model.tipoEvolucion == null){
            this.errores.push({ message: 'Seleccione un tipo de evolución'});
            areErrors = true;
        }

        if(areErrors){
            this.showErrors();
            return false;
        }

        return true;
    }

    filtrarTabla(event: any) { 
        const val = event.target.value.toLowerCase();

        // filter our data
        const temp = this.temp.filter(function(d) {
            return d.tipoEvolucion.nombre.toLowerCase().indexOf(val) !== -1 || 
                   Util.formattedDate(d.fecha).indexOf(val) !== -1 || !val;
        }); 

        this.parametrizacionEvoluciones = temp;
    }

    delete(id: string, content: any) {   
        this.clearAndcloseErrors();  
        this.ngbModal.open(content).result.then((result) => {
            this.showLoading(true);
            this.parametrizarEvolucionService.delete(id)
                .subscribe(data => {                    
                    this.loadTable();                    
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
}