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
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, tap, switchMap, catchError} from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { PacienteService } from '../pacientes/paciente.service';
import { ParametrizarEvolucionService } from '../../configuracion/evoluciones';

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
    tipoAtencion: string;

    pacienteSeleccionado: any;

    constructor(
        private evolucionService: EvolucionService,
        private historiaService: HistoriaService,
        private router: Router,
        private ngbModal: NgbModal,
        private pacienteService: PacienteService,
        private parametrizarEvolucionService: ParametrizarEvolucionService) {
            this.model = new Evolucion();
            this.model.historia = new Historia();
            this.model.historia.admision = new Admision();
            this.model.historia.admision.paciente = new Paciente();
    }

    ngOnInit() {    
        this.fillSelects();    
        this.loadEvolucionesEmpleado();        
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

    private loadEvolucionesEmpleado() {     
        this.showLoading(true);    
        this.evolucionService.getEvolucionesEmpleado()
            .subscribe(
                data => {    
                    this.evoluciones = data;                    
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

    create() {
        if(!this.validateCreate()) return;
        
        let anio = this.fecha.year;
        let mes = this.fecha.month;
        let dia = this.fecha.day;

        if (mes.length < 2) mes = '0' + mes;
        if (dia.length < 2) dia = '0' + dia;
        
        this.showLoading(true);    
        this.parametrizarEvolucionService.getAll()
            .subscribe(
                data => {    
                    var guardo = false;                  
                    data.forEach((x: any) => {
                        let fecha = Util.formattedDate(x.fecha);                           
                        if(dia == fecha.substring(0, 2)
                            && mes == fecha.substring(3, 5)
                            && anio == fecha.substring(6, 10)
                            && this.model.tipoEvolucion.nombre == x.tipoEvolucion.nombre)
                        {
                            guardo = true;
                            this.model.fecha = new Date(anio, mes - 1, dia) 
                            this.showLoading(true);    
                            this.evolucionService.create(this.model)
                                .subscribe(
                                    data => {                                                          
                                        this.showLoading(false);
                                        this.clearModel();
                                        this.loadEvolucionesEmpleado();
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
                    })  
                    if(!guardo){
                        this.errores.push({ message: 'Usted no tiene asignada evolución para la fecha y tipo ingresado'});
                        this.showErrors();            
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

    validateCreate(){
        let areErrors = false;
        this.clearAndcloseErrors(); 

        if(this.pacienteSeleccionado == null)
        {
            this.errores.push({ message: 'Ingrese un paciente'});
            areErrors = true;
        }

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

        if(this.fecha != undefined && this.fecha != null){
            let fecha = this.model.fecha = new Date(Number(this.fecha.year), Number(this.fecha.month) - 1, Number(this.fecha.day)) 
            if(fecha < this.model.historia.admision.fechaDeIngreso){
                this.errores.push({ message: 'Ingrese una igual o mayor a la fecha de ingreso del paciente'});
                areErrors = true;
            }
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

    paciente: any;

    searchingPaciente = false;
    searchFailedPaciente = false;
    formatterPaciente = (x: {nombres: string, apellidos: string}) => `${x.nombres} ${x.apellidos}`;

    searchPaciente = (text$: Observable<string>) =>
        text$.pipe(
        debounceTime(200),
        tap(() => this.searchingPaciente = true),
        switchMap(
            term => term.length < 3 ? [] :
                this.pacienteService.search(term)
                    .pipe(                        
                        tap(() => this.searchFailedPaciente = false),                        
                        catchError(() => {
                            this.searchFailedPaciente = true;
                            return of([]);
                        })
                    )
        ),
        tap(() => this.searchingPaciente = false)
    )

    setPaciente(item: any){
        this.clearAndcloseErrors();              

        if(item == undefined || item == ''){
            this.errores.push({ message: 'Ingrese un paciente'});                        
            this.showErrors();
            return;
        } 
        
        this.model.historia.admision.paciente = item.item;
        this.showLoading(true);    
        this.historiaService.getHistoriaByIdentificacionPaciente(this.model.historia.admision.paciente.identificacion)
            .subscribe(
                data => {      
                    if(data != null){
                        this.model.historia = data;
                        this.tipoDocumento = this.model.historia.admision.paciente.tipoDocumento.nombre;                                                       
                        this.tipoAtencion = this.model.historia.admision.atencion.nombre;
                        this.edad = Util.formattedDate( this.model.historia.admision.paciente.fechaDeNacimiento);                                                       
                        
                        if (this.model.historia.admision.paciente.sexo != null && 
                            this.model.historia.admision.paciente.sexo != undefined)
                            this.sexo = this.model.historia.admision.paciente.sexo.nombre;  

                        this.tipoEntidad = this.model.historia.admision.paciente.tipoEntidad.nombre;  
                        
                        if(this.model.historia.admision.paciente.aseguradora != null){
                            this.aseguradora = this.model.historia.admision.paciente.aseguradora.nombre;                                                        
                        }
                        
                    }else{
                        this.errores.push({ message: 'No se encontró un paciente con esa identificación o no tiene una historia activa'});                        
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

    clearModel(){        
        this.model = new Evolucion();
        this.model.historia = new Historia();
        this.model.historia.admision = new Admision();
        this.model.historia.admision.paciente = new Paciente();

        this.fecha = undefined;    
    
        this.tipoDocumento = '';
        this.edad = '';
        this.sexo = '';
        this.tipoEntidad = '';
        this.aseguradora = '';
            
        this.tipoAtencion = '';

        this.pacienteSeleccionado = null; 
    }

    delete(idHistoria: string, content: any) {   
        this.clearAndcloseErrors();     
        this.ngbModal.open(content).result.then((result) => {
            this.showLoading(true);
            this.evolucionService.delete(idHistoria)
                .subscribe(data => {                    
                    this.loadEvolucionesEmpleado();                  
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