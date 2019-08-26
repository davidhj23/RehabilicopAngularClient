import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Util } from '../../../_utils';
import { HistoriaService } from '../historias/historia.service';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, tap, switchMap, catchError} from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { PacienteService } from '../pacientes/paciente.service';
import { SignosVitales } from './signosVitales';
import { Historia } from '../historias/historia';
import { Admision } from '../admisiones/admision';
import { Paciente } from '../pacientes/paciente';
import { EstadoConciencia, EstadoConcienciaService } from '../../listas/estados-conciencias';
import { SignosVitalesService } from './SignosVitales.service';

@Component({
    selector: 'signosVitales',
    templateUrl: 'signosVitales.component.html',
})

export class SignosVitalesComponent implements OnInit {   
    
    model: SignosVitales;
    
    tipoDocumento: string;
    edad: string;
    sexo: string;
    tipoEntidad: string;
    aseguradora: string;

    loading = false;        
    rowsOnPage = 5;
    
    areErrors = false;
    errores: any[] = []; 

    fecha: any;     
    public mask = [/\d/, /\d/, ':', /\d/, /\d/]
    public temperaturaMask = [/\d/, /\d/, '.', /\d/]
    estadoConciencia: EstadoConciencia;   
    estadosConciencias: any[] = [];  	
    allSignosVitales: any[] = [];  

    constructor(        
        private historiaService: HistoriaService,        
        private pacienteService: PacienteService,
        private estadoConcienciaService: EstadoConcienciaService,
        private signosVitalesService: SignosVitalesService) {

            this.model = new SignosVitales();
            this.model.historia = new Historia();
            this.model.historia.admision = new Admision();
            this.model.historia.admision.paciente = new Paciente();
    }

    ngOnInit() {  
        this.fillSelects();            
    }

    fillSelects()
    {
        this.showLoading(true);    
        this.estadoConcienciaService.getAll()
            .subscribe(
                data => {      
                    this.estadosConciencias = data;                  
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
                        
                        this.getSignosVitalesByPaciente(this.model.historia.admision.paciente.identificacion);
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

    agregar(){
        if(!this.validateAgregar()) return;     
        
        this.model.fecha = new Date(Number(this.fecha.year), Number(this.fecha.month) - 1, Number(this.fecha.day));         
        this.model.estadoConciencia = this.estadoConciencia;
        
        this.showLoading(true);    
        this.signosVitalesService.create(this.model)
            .subscribe(
                data => {                                                          
                    this.showLoading(false);                     
                    this.getSignosVitalesByPaciente(this.model.historia.admision.paciente.identificacion);                                               
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

    getSignosVitalesByPaciente(idPaciente: String){
        this.showLoading(true);    
        this.signosVitalesService.getSignosVitalesByPaciente(idPaciente)
            .subscribe(
                data => {    
                    this.allSignosVitales = data;                    
                    console.log(this.allSignosVitales)
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

    validateAgregar(){
        let areErrors = false;
        this.clearAndcloseErrors();        

        if(this.model.historia.admision.paciente.identificacion == undefined 
            || this.model.historia.admision.paciente.identificacion == null){
            this.errores.push({ message: 'Seleccione un paciente'});
            areErrors = true;
        }

        if(this.fecha == undefined || this.fecha == null){
            this.errores.push({ message: 'Ingrese una fecha'});
            areErrors = true;
        }

        if(this.model.hora == undefined || this.model.hora == null){
            this.errores.push({ message: 'Ingrese una hora válida'});
            areErrors = true;
        }

        if(this.model.ampm == undefined || this.model.ampm == null){
            this.errores.push({ message: 'Ingrese una hora válida'});
            areErrors = true;
        }

        if(this.model.tension == undefined 
            || this.model.tension == null
            || this.model.tension == ''){
            this.errores.push({ message: 'Ingrese tensión'});
            areErrors = true;
        }

        if(this.model.temperatura == undefined 
            || this.model.temperatura == null
            || this.model.temperatura == ''){
            this.errores.push({ message: 'Ingrese temperatura'});
            areErrors = true;
        }

        if(this.model.pulso == undefined 
            || this.model.pulso == null
            || this.model.pulso == ''){
            this.errores.push({ message: 'Ingrese pulso'});
            areErrors = true;
        }

        if(this.model.respiracion == undefined 
            || this.model.respiracion == null
            || this.model.respiracion == ''){
            this.errores.push({ message: 'Ingrese respiración'});
            areErrors = true;
        }

        if(this.model.glucometria == undefined 
            || this.model.glucometria == null
            || this.model.glucometria == ''){
            this.errores.push({ message: 'Ingrese glucometría'});
            areErrors = true;
        }

        if(this.estadoConciencia == undefined || this.estadoConciencia == null){
            this.errores.push({ message: 'Ingrese estado conciencia'});
            areErrors = true;
        }

        if(areErrors){
            this.showErrors();
            return false;
        }

        return true;
    }

    clearAgregarForm(){                        
        this.fecha = null;
        this.model.ampm = null;
        this.model.hora = null;

        this.estadoConciencia = null;
        this.model.pulso = '';
        this.model.tension = '';
        this.model.glucometria = '';
        this.model.respiracion = '';        
        this.model.temperatura = '';
    }
}