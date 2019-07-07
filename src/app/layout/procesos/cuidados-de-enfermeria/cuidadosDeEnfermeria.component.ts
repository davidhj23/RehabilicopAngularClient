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
import { CuidadosDeEnfermeria } from './cuidadosDeEnfermeria';
import { Cie10Service, Cie10 } from '../../listas/cie10s';
import { CuidadosDeEnfermeriaService } from './cuidadosDeEnfermeria.service';

@Component({
    selector: 'cuidadosDeEnfermeria',
    templateUrl: 'cuidadosDeEnfermeria.component.html',
})

export class CuidadosDeEnfermeriaComponent implements OnInit {   
    
    model: CuidadosDeEnfermeria;
    
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
    allCuidadosDeEnfermeria: any[] = [];      
    allDxEnfermeria: any[] = [];  
    
    dx: any; 
    dxEnfermeria: any; 

    constructor(        
        private historiaService: HistoriaService,        
        private pacienteService: PacienteService,
        private cuidadosDeEnfermeriaService: CuidadosDeEnfermeriaService,        
        private cie10Service: Cie10Service,
        private userService: UserService) {

            this.model = new CuidadosDeEnfermeria();
            this.model.historia = new Historia();
            this.model.historia.admision = new Admision();
            this.model.historia.admision.paciente = new Paciente();
    }

    ngOnInit() {   
        this.fillSelects();       
    }

    fillSelects(){
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
                        
                        this.getCuidadosDeEnfermeriaByPaciente(this.model.historia.admision.paciente.identificacion);

                        this.getImpresionDiagnostica(this.model.historia.idImpresionDiagnostica);
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

    getImpresionDiagnostica(idDiagnostico: String){
        this.showLoading(true);    
        this.cie10Service.getById(idDiagnostico)
            .subscribe(
                data => {      
                    this.dx = `(${data.codigo}) ${data.nombre}`;                                                      
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
        this.model.dxEnfermeria = this.dxEnfermeria;
        
        this.showLoading(true);    
        this.cuidadosDeEnfermeriaService.create(this.model)
            .subscribe(
                data => {                                                          
                    this.showLoading(false);                     
                    this.getCuidadosDeEnfermeriaByPaciente(this.model.historia.admision.paciente.identificacion);                                               
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

    getCuidadosDeEnfermeriaByPaciente(idPaciente: String){
        this.showLoading(true);    
        this.cuidadosDeEnfermeriaService.getCuidadosDeEnfermeriaByPaciente(idPaciente)
            .subscribe(
                data => {                        
                    this.allCuidadosDeEnfermeria = data;                                        
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

        if(this.model.hallazgos == undefined 
            || this.model.hallazgos == null
            || this.model.hallazgos == ''){
            this.errores.push({ message: 'Ingrese hallazgos'});
            areErrors = true;
        }

        if(this.model.acciones == undefined 
            || this.model.acciones == null
            || this.model.acciones == ''){
            this.errores.push({ message: 'Ingrese acciones'});
            areErrors = true;
        }

        if(this.model.evaluacion == undefined 
            || this.model.evaluacion == null
            || this.model.evaluacion == ''){
            this.errores.push({ message: 'Ingrese evaluaciones'});
            areErrors = true;
        }

        if(this.dxEnfermeria == undefined || this.dxEnfermeria == null){
            this.errores.push({ message: 'Ingrese DX enfermería'});
            areErrors = true;
        }

        if(areErrors){
            this.showErrors();
            return false;
        }

        return true;
    }

    searching = false;
    searchFailed = false;
    formatter = (x: {codigo: string, nombre: string}) => `(${x.codigo}) ${x.nombre}`;

    search = (text$: Observable<string>) =>
        text$.pipe(
        debounceTime(200),
        tap(() => this.searching  = true),
        switchMap(
            term => term.length < 3 ? [] :
                this.cie10Service.search(term)
                    .pipe(
                        tap(() => this.searchFailed = false),
                        catchError(() => {
                            this.searchFailed = true;
                            return of([]);
                        })
                    )
        ),
        tap(() => this.searching  = false)
    )

    clearAgregarForm(){                        
        this.fecha = null;                        
        this.model.hallazgos = '';  
        this.model.acciones = '';  
        this.model.evaluacion = '';  
        this.model.dxEnfermeria = null;  
        this.dxEnfermeria = null;
    }
}