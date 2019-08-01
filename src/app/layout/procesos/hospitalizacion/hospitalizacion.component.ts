import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Util } from '../../../_utils';
import { HistoriaService } from '../historias/historia.service';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, tap, switchMap, catchError} from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { PacienteService } from '../pacientes/paciente.service';
import { Historia } from '../historias/historia';
import { Admision } from '../admisiones/admision';
import { Paciente } from '../pacientes/paciente';
import { UserService } from '../../seguridad/usuarios/user.service';
import { Cie10Service, Cie10 } from '../../listas/cie10s';
import { HospitalizacionService } from './hospitalizacion.service';
import { Hospitalizacion } from './hospitalizacion';
import { ViaIngresoService, ViaIngreso } from '../../listas/vias-ingresos';
import { OpcionService, Opcion } from '../../listas/opciones';

@Component({
    selector: 'hospitalizacion',
    templateUrl: 'hospitalizacion.component.html',
})

export class HospitalizacionComponent implements OnInit {   
    
    model: Hospitalizacion;
    
    tipoDocumento: string;
    edad: string;
    sexo: string;
    tipoEntidad: string;
    aseguradora: string;

    loading = false;        
    rowsOnPage = 5;
    
    areErrors = false;
    errores: any[] = []; 

    fechaIngreso: any; 
    fechaSalida: any; 
    public mask = [/\d/, /\d/, ':', /\d/, /\d/]  
    
    viasIngresos: any[] = []; 
    viaIngreso = new ViaIngreso();    
    embarazada = new Opcion();   
    
    accidenteDeTrabajo = new Opcion();  
    eventoCatastrofico = new Opcion();
    maltrato = new Opcion();  

    accidenteDeTransito = new Opcion();
    lesionPorAgresion = new Opcion();  
    enfermedadGeneral = new Opcion();  
    
    otroTipoDeAccidente = new Opcion();
    lesionAutoInfligida = new Opcion();  
    enfermedadProfesional = new Opcion(); 

    opciones: any[] = [];     

    constructor(        
        private historiaService: HistoriaService,        
        private pacienteService: PacienteService,
        private hospitalizacionService: HospitalizacionService,
        private cie10Service: Cie10Service,
        private viaIngresoService: ViaIngresoService,
        private opcionService: OpcionService,
        private userService: UserService) {

            this.model = new Hospitalizacion();
            this.model.historia = new Historia();
            this.model.historia.admision = new Admision();
            this.model.historia.admision.paciente = new Paciente();
    }

    ngOnInit() {   
        this.fillSelects();       
    }

    fillSelects(){
        this.showLoading(true);    
        this.opcionService.getAll()
            .subscribe(
                data => {      
                    this.opciones = data;                    
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
        this.viaIngresoService.getAll()
            .subscribe(
                data => {      
                    this.viasIngresos = data;                    
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
                        this.model.historia = data
                        this.model.historia.admision = this.model.historia.admision;  
                        this.tipoDocumento = this.model.historia.admision.paciente.tipoDocumento.nombre;                                                       
                        this.edad = Util.formattedDate( this.model.historia.admision.paciente.fechaDeNacimiento);                                                       
                        
                        if (this.model.historia.admision.paciente.sexo != null && 
                            this.model.historia.admision.paciente.sexo != undefined)
                            this.sexo = this.model.historia.admision.paciente.sexo.nombre;  

                        this.tipoEntidad = this.model.historia.admision.paciente.tipoEntidad.nombre;                                                       
                        this.aseguradora = this.model.historia.admision.paciente.aseguradora.nombre; 

                        this.getHospitalizacionByPaciente(this.model.historia.admision.paciente.identificacion);
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
    
    getHospitalizacionByPaciente(identificacion: any)
    {
        this.hospitalizacionService.getHospitalizacionByPaciente(identificacion)
        .subscribe(
            data => {      
                if(data != null){                    
                    this.model = data;  
                    this.viaIngreso.idViaIngreso = this.model.viaIngreso.idViaIngreso;  
                    
                    if (this.model.embarazada != null) 
                    {
                        this.embarazada.idOpcion =  this.model.embarazada.idOpcion
                    }

                    if (this.model.accidenteDeTrabajo != null) 
                    {
                        this.accidenteDeTrabajo.idOpcion =  this.model.accidenteDeTrabajo.idOpcion
                    }

                    if (this.model.eventoCatastrofico != null) 
                    {
                        this.eventoCatastrofico.idOpcion =  this.model.eventoCatastrofico.idOpcion
                    }

                    if (this.model.maltrato != null) 
                    {
                        this.maltrato.idOpcion =  this.model.maltrato.idOpcion
                    }

                    if (this.model.accidenteDeTransito != null) 
                    {
                        this.accidenteDeTransito.idOpcion =  this.model.accidenteDeTransito.idOpcion
                    }

                    if (this.model.lesionPorAgresion != null) 
                    {
                        this.lesionPorAgresion.idOpcion =  this.model.lesionPorAgresion.idOpcion
                    }

                    if (this.model.enfermedadGeneral != null) 
                    {
                        this.enfermedadGeneral.idOpcion =  this.model.enfermedadGeneral.idOpcion
                    }

                    if (this.model.otroTipoDeAccidente != null) 
                    {
                        this.otroTipoDeAccidente.idOpcion =  this.model.otroTipoDeAccidente.idOpcion
                    }
                   
                    if (this.model.lesionAutoInfligida != null) 
                    {
                        this.lesionAutoInfligida.idOpcion =  this.model.lesionAutoInfligida.idOpcion
                    }

                    if (this.model.enfermedadProfesional != null) 
                    {
                        this.enfermedadProfesional.idOpcion =  this.model.enfermedadProfesional.idOpcion
                    }

                    this.fechaIngreso = Util.formattedDateForDatePicker(this.model.fechaIngreso);
                    this.fechaSalida = Util.formattedDateForDatePicker(this.model.fechaSalida);

                    this.diagnosticoDeIngreso = this.model.diagnosticoDeIngreso;                    
                    this.diagnosticoDeEgreso = this.model.diagnosticoDeEgreso;
                    this.complicacion = this.model.complicacion ;
                    this.causaDeLaMuerte = this.model.causaDeLaMuerte;
                    this.enfermedadSobregenerada = this.model.enfermedadSobregenerada;
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

    agregar(){
        if(!this.validateAgregar()) return;     
        
        this.model.viaIngreso = (this.viaIngreso.idViaIngreso != null) ? this.viaIngreso : null;
        this.model.embarazada = (this.embarazada.idOpcion != null) ? this.embarazada : null;

        this.model.fechaIngreso = new Date(Number(this.fechaIngreso.year), Number(this.fechaIngreso.month) - 1, Number(this.fechaIngreso.day));                 
        this.model.fechaSalida = new Date(Number(this.fechaSalida.year), Number(this.fechaSalida.month) - 1, Number(this.fechaSalida.day));                 
        
        this.model.accidenteDeTrabajo = (this.accidenteDeTrabajo.idOpcion != null) ? this.accidenteDeTrabajo : null;
        this.model.eventoCatastrofico = (this.eventoCatastrofico.idOpcion != null) ? this.eventoCatastrofico : null;
        this.model.maltrato = (this.maltrato.idOpcion != null) ? this.maltrato : null;

        this.model.accidenteDeTransito = (this.accidenteDeTransito.idOpcion != null) ? this.accidenteDeTransito : null;
        this.model.lesionPorAgresion = (this.lesionPorAgresion.idOpcion != null) ? this.lesionPorAgresion : null;
        this.model.enfermedadGeneral = (this.enfermedadGeneral.idOpcion != null) ? this.enfermedadGeneral : null;

        this.model.otroTipoDeAccidente = (this.otroTipoDeAccidente.idOpcion != null) ? this.otroTipoDeAccidente : null;
        this.model.lesionAutoInfligida = (this.lesionAutoInfligida.idOpcion != null) ? this.lesionAutoInfligida : null;        
        this.model.enfermedadProfesional = (this.enfermedadProfesional.idOpcion != null) ? this.enfermedadProfesional : null;

        this.model.diagnosticoDeIngreso = this.diagnosticoDeIngreso;
        this.model.diagnosticoDeEgreso = this.diagnosticoDeEgreso;
        this.model.complicacion = this.complicacion ;
        this.model.causaDeLaMuerte = this.causaDeLaMuerte;
        this.model.enfermedadSobregenerada = this.enfermedadSobregenerada;
        
        this.showLoading(true);    
        this.hospitalizacionService.create(this.model)
            .subscribe(
                data => {                                                          
                    this.showLoading(false);                                         
                    this.clearAgregarForm();  
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

    validateAgregar(){
        let areErrors = false;
        this.clearAndcloseErrors();        

        if(this.model.historia.admision.paciente.identificacion == undefined 
            || this.model.historia.admision.paciente.identificacion == null){
            this.errores.push({ message: 'Seleccione un paciente'});
            areErrors = true;
        }
        
        if(this.viaIngreso == undefined || this.viaIngreso == null || this.viaIngreso.idViaIngreso == null){
            this.errores.push({ message: 'Ingrese una via de ingreso'});
            areErrors = true;
        }

        if(this.fechaIngreso == undefined || this.fechaIngreso == null){
            this.errores.push({ message: 'Ingrese una fecha de ingreso'});
            areErrors = true;
        }

        if(this.model.horaIngreso == undefined || this.model.horaIngreso == null){
            this.errores.push({ message: 'Ingrese una hora válida'});
            areErrors = true;
        }

        if(this.model.ampmIngreso == undefined || this.model.ampmIngreso == null){
            this.errores.push({ message: 'Ingrese una hora válida'});
        }           

        if(this.fechaSalida == undefined || this.fechaSalida == null){
            this.errores.push({ message: 'Ingrese una fecha de egreso'});
            areErrors = true;
        }

        if(this.model.horaSalida == undefined || this.model.horaSalida == null){
            this.errores.push({ message: 'Ingrese una hora válida'});
            areErrors = true;
        }

        if(this.model.ampmSalida == undefined || this.model.ampmSalida == null){
            this.errores.push({ message: 'Ingrese una hora válida'});
        }

        if(this.model.acudiente == undefined 
            || this.model.acudiente == null
            || this.model.acudiente == ''){
            this.errores.push({ message: 'Ingrese un acudiente'});
            areErrors = true;
        }

        if(areErrors){
            this.showErrors();
            return false;
        }

        return true;
    }

    diagnosticoDeIngreso: any;
    searchingDiagnosticoDeIngreso = false;
    searchFailedDiagnosticoDeIngreso = false;
    formatterDiagnosticoDeIngreso = (x: {codigo: string, nombre: string}) => `(${x.codigo}) ${x.nombre}`;

    searchDiagnosticoDeIngreso = (text$: Observable<string>) =>
        text$.pipe(
        debounceTime(200),
        tap(() => this.searchingDiagnosticoDeIngreso  = true),
        switchMap(
            term => term.length < 3 ? [] :
                this.cie10Service.search(term)
                    .pipe(
                        tap(() => this.searchFailedDiagnosticoDeIngreso = false),
                        catchError(() => {
                            this.searchFailedDiagnosticoDeIngreso = true;
                            return of([]);
                        })
                    )
        ),
        tap(() => this.searchingDiagnosticoDeIngreso = false)
    )

    diagnosticoDeEgreso: any;
    searchingDiagnosticoDeEgreso = false;
    searchFailedDiagnosticoDeEgreso = false;
    formatterDiagnosticoDeEgreso = (x: {codigo: string, nombre: string}) => `(${x.codigo}) ${x.nombre}`;

    searchDiagnosticoDeEgreso = (text$: Observable<string>) =>
        text$.pipe(
        debounceTime(200),
        tap(() => this.searchingDiagnosticoDeEgreso  = true),
        switchMap(
            term => term.length < 3 ? [] :
                this.cie10Service.search(term)
                    .pipe(
                        tap(() => this.searchFailedDiagnosticoDeEgreso = false),
                        catchError(() => {
                            this.searchFailedDiagnosticoDeEgreso = true;
                            return of([]);
                        })
                    )
        ),
        tap(() => this.searchingDiagnosticoDeEgreso = false)
    )

    complicacion: any;
    searchingComplicacion = false;
    searchFailedComplicacion = false;
    formatterComplicacion = (x: {codigo: string, nombre: string}) => `(${x.codigo}) ${x.nombre}`;

    searchComplicacion = (text$: Observable<string>) =>
        text$.pipe(
        debounceTime(200),
        tap(() => this.searchingComplicacion  = true),
        switchMap(
            term => term.length < 3 ? [] :
                this.cie10Service.search(term)
                    .pipe(
                        tap(() => this.searchFailedComplicacion = false),
                        catchError(() => {
                            this.searchFailedComplicacion = true;
                            return of([]);
                        })
                    )
        ),
        tap(() => this.searchingComplicacion = false)
    )

    causaDeLaMuerte: any;
    searchingCausaDeLaMuerte = false;
    searchFailedCausaDeLaMuerte = false;
    formatterCausaDeLaMuerte = (x: {codigo: string, nombre: string}) => `(${x.codigo}) ${x.nombre}`;

    searchCausaDeLaMuerte = (text$: Observable<string>) =>
        text$.pipe(
        debounceTime(200),
        tap(() => this.searchingCausaDeLaMuerte  = true),
        switchMap(
            term => term.length < 3 ? [] :
                this.cie10Service.search(term)
                    .pipe(
                        tap(() => this.searchFailedCausaDeLaMuerte = false),
                        catchError(() => {
                            this.searchFailedCausaDeLaMuerte = true;
                            return of([]);
                        })
                    )
        ),
        tap(() => this.searchingCausaDeLaMuerte = false)
    )

    enfermedadSobregenerada: any;
    searchingEnfermedadSobregenerada = false;
    searchFailedEnfermedadSobregenerada = false;
    formatterEnfermedadSobregenerada = (x: {codigo: string, nombre: string}) => `(${x.codigo}) ${x.nombre}`;

    searchEnfermedadSobregenerada = (text$: Observable<string>) =>
        text$.pipe(
        debounceTime(200),
        tap(() => this.searchingEnfermedadSobregenerada  = true),
        switchMap(
            term => term.length < 3 ? [] :
                this.cie10Service.search(term)
                    .pipe(
                        tap(() => this.searchFailedEnfermedadSobregenerada = false),
                        catchError(() => {
                            this.searchFailedEnfermedadSobregenerada = true;
                            return of([]);
                        })
                    )
        ),
        tap(() => this.searchingEnfermedadSobregenerada = false)
    )

    clearAgregarForm(){   
    }
}