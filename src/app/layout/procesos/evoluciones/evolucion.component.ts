import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Evolucion } from './evolucion';
import { EvolucionService } from './evolucion.service';
import { Historia } from '../historias/historia';
import { Admision } from '../admisiones/admision';
import { Paciente } from '../pacientes/paciente';
import { Util } from '../../../_utils';
import { HistoriaService } from '../historias/historia.service';

@Component({
    selector: 'evolucion',
    templateUrl: 'evolucion.component.html',
})

export class EvolucionComponent implements OnInit {   
    
    model: Evolucion;

    tiposEvoluciones: Evolucion[] = [];
    evoluciones: Evolucion[] = [];
    temp: Evolucion[] = [];  

    fecha: any;    
    
    tipoDocumento: string;
    edad: string;
    sexo: string;
    tipoEntidad: string;
    aseguradora: string;

    loading = false;        
    rowsOnPage = 5;
    
    areErrors = false;
    errores: any[] = [];       

    constructor(
        private evolucionService: EvolucionService,
        private historiaService: HistoriaService,
        private router: Router,
        private ngbModal: NgbModal) {
            this.model = new Evolucion();
            this.model.historia = new Historia();
            this.model.historia.admision = new Admision();
            this.model.historia.admision.paciente = new Paciente();
    }

    ngOnInit() {    
        this.fillSelects();    
        this.loadEvolucionesPorMesYEmpleado();        
    }

    private fillSelects(){
        this.showLoading(true);    
        this.evolucionService.getTiposEvoluciones()
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

    private loadEvolucionesPorMesYEmpleado() {     
    }

    create() {
        if(!this.validateCreate()) return;
        
        this.model.fecha = new Date(Number(this.fecha.year), Number(this.fecha.month) - 1, Number(this.fecha.day)) 

        this.showLoading(true);    
        this.evolucionService.create(this.model)
            .subscribe(
                data => {                                                          
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

        if(this.fecha == undefined || this.fecha == null){
            this.errores.push({ message: 'Ingrese una fecha'});
            areErrors = true;
        }

        if(this.model.tipoEvolucion == undefined || this.model.tipoEvolucion == null){
            this.errores.push({ message: 'Seleccione un tipo de evolución'});
            areErrors = true;
        }

        if(this.model.descripcion == undefined || this.model.descripcion == null){
            this.errores.push({ message: 'Ingrese una descripción'});
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
        
        setTimeout(function() {
            this.clearAndcloseErrors();
        }.bind(this), 10000); 
    }

    clearAndcloseErrors(){
        this.errores = [];
        this.areErrors = false;
    }

    keytab(event: Event){
        let areErrors = false;
        this.clearAndcloseErrors();              

        if(this.model.historia.admision.paciente.identificacion == undefined || this.model.historia.admision.paciente.identificacion == ''){
            this.errores.push({ message: 'Ingrese un paciente'});                        
            this.showErrors();
            return;
        }

        this.showLoading(true);    
        this.historiaService.getHistoriaByIdentificacionPaciente(this.model.historia.admision.paciente.identificacion)
            .subscribe(
                data => {      
                    if(data != null){
                        this.model.historia = data
                        this.model.historia.admision = this.model.historia.admision;  
                        this.tipoDocumento = this.model.historia.admision.paciente.tipoDocumento.nombre;                                                       
                        this.edad = Util.formattedDate( this.model.historia.admision.paciente.fechaDeNacimiento);                                                       
                        this.sexo = this.model.historia.admision.paciente.sexo.nombre;                                                       
                        this.tipoEntidad = this.model.historia.admision.paciente.tipoEntidad.nombre;                                                       
                        this.aseguradora = this.model.historia.admision.paciente.aseguradora.nombre;                                                       
                    }else{
                        this.errores.push({ message: 'No se encontró un paciente con esa identificación'});                        
                        this.showErrors();                                                
                        return;
                    }
                    
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
}