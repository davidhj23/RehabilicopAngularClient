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
import { AdministracionDeMedicamentos } from './administracionDeMedicamentos';
import { AdministracionDeMedicamentosService } from './administracionDeMedicamentos.service';
import { MedicamentoService, Medicamento } from '../../listas/medicamentos';
import { DosisService, Dosis } from '../../listas/dosis';
import { UserService } from '../../seguridad/usuarios/user.service';
import { User } from '../../seguridad/usuarios/user';

@Component({
    selector: 'administracionDeMedicamentos',
    templateUrl: 'administracionDeMedicamentos.component.html',
})

export class AdministracionDeMedicamentosComponent implements OnInit {   
    
    model: AdministracionDeMedicamentos;
    
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
    allAdministracionDeMedicamentos: any[] = [];  
    medicamentos: any[] = []; 
    frecuencias: any[] = []; 
    enfermeros: any[] = [];

    medicamento: Medicamento; 
    frecuencia: Dosis; 
    administra: User; 

    constructor(        
        private historiaService: HistoriaService,        
        private pacienteService: PacienteService,
        private administracionDeMedicamentosService: AdministracionDeMedicamentosService,
        private medicamentoService: MedicamentoService,
        private dosisService: DosisService,
        private userService: UserService) {

            this.model = new AdministracionDeMedicamentos();
            this.model.historia = new Historia();
            this.model.historia.admision = new Admision();
            this.model.historia.admision.paciente = new Paciente();
    }

    ngOnInit() {   
        this.fillSelects();       
    }

    fillSelects(){
        this.showLoading(true);    
        this.medicamentoService.getAll()
            .subscribe(
                data => {      
                    this.medicamentos = data;                    
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
        this.dosisService.getAll()
            .subscribe(
                data => {      
                    this.frecuencias = data;                    
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
        this.userService.getAllEnfermeros()
            .subscribe(
                data => {      
                    this.enfermeros = data;                    
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
                        
                        this.getAdministracionDeMedicamentosByPaciente(this.model.historia.admision.paciente.identificacion);
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

    agregar(){
        if(!this.validateAgregar()) return;     
        
        this.model.fecha = new Date(Number(this.fecha.year), Number(this.fecha.month) - 1, Number(this.fecha.day));                 
        this.model.medicamento = this.medicamento;
        this.model.frecuencia = this.frecuencia;
        this.model.administra = this.administra;

        this.showLoading(true);    
        this.administracionDeMedicamentosService.create(this.model)
            .subscribe(
                data => {                                                          
                    this.showLoading(false);                     
                    this.getAdministracionDeMedicamentosByPaciente(this.model.historia.admision.paciente.identificacion);                                               
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

    getAdministracionDeMedicamentosByPaciente(idPaciente: String){
        this.showLoading(true);    
        this.administracionDeMedicamentosService.getAdministracionDeMedicamentosByPaciente(idPaciente)
            .subscribe(
                data => {    
                    console.log(data)
                    this.allAdministracionDeMedicamentos = data;                                        
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

        if(this.fecha == undefined || this.fecha == null){
            this.errores.push({ message: 'Ingrese una fecha'});
            areErrors = true;
        }

        if(areErrors){
            this.showErrors();
            return false;
        }

        return true;
    }

    clearAgregarForm(){                        
        this.fecha = '';                
        this.model.ampm = '';
        this.model.hora = '';
    }
}