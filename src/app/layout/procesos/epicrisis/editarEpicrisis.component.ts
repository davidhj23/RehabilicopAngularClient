import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Historia } from '../historias/historia';
import { Admision } from '../admisiones/admision';
import { Paciente } from '../pacientes/paciente';
import { Util } from '../../../_utils';
import { HistoriaService } from '../historias/historia.service';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, tap, switchMap, catchError} from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { PacienteService } from '../pacientes/paciente.service';
import { Epicrisis } from './epicrisis';
import { EpicrisisService } from './epicrisis.service';
import { MedicamentoService, Medicamento } from '../../listas/medicamentos';
import { Dosis, DosisService } from '../../listas/dosis';
import { User } from '../../seguridad/usuarios/user';
import { UserService } from '../../seguridad/usuarios/user.service';
import { TratamientoFarmacologico } from './TratamientoFarmacologico';
import { Cie10Service } from '../../listas/cie10s';
import { AdmisionService } from '../admisiones/admision.service';

@Component({
    selector: 'editarEpicrisis',
    templateUrl: 'editarEpicrisis.component.html',
})

export class EditarEpicrisisComponent implements OnInit {   
    
    currentEpicrisisId: string;
    model: Epicrisis;

    medicamentos: Medicamento[] = [];      
    listaDosis: Dosis[] = [];  
    medicos: User[] = [];  

    tratamientoFarmacologicos: TratamientoFarmacologico[] = [];

    tipoDocumento: string;
    edad: string;
    sexo: string;
    tipoEntidad: string;
    aseguradora: string;

    cie10: string;
    medico = new User();

    fechaDeIngreso: any;
    public mask = [/\d/, /\d/, ':', /\d/, /\d/]
	fechaDeContinuacion: any;
    fechaDeEgreso: any;
    diasDeEstancia: string;

    loading = false;        
    rowsOnPage = 5;
    
    areErrors = false;
    errores: any[] = []; 
    tipoAtencion: string;

    constructor(
        private epicrisisService: EpicrisisService,        
        private route: ActivatedRoute,
        private cie10Service: Cie10Service,
        private medicamentoService: MedicamentoService,
        private dosisService: DosisService,
        private admisionService: AdmisionService,
        private userService: UserService) {

            this.model = new Epicrisis();
            this.model.historia = new Historia();
            this.model.historia.admision = new Admision();
            this.model.historia.admision.paciente = new Paciente();

            this.route.params.subscribe( 
                params => {
                    this.currentEpicrisisId = params['id'];
                }
            );
    }

    ngOnInit() { 
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
                    this.listaDosis = data;                    
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
        this.userService.getAllMedicosyPsiquiatras()
            .subscribe(
                data => {      
                    this.medicos = data;                    
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
        this.epicrisisService.getById(this.currentEpicrisisId)
            .subscribe(
                data => {                                                 
                    this.model = data;                                                 
                    this.tipoDocumento = this.model.historia.admision.paciente.tipoDocumento.nombre;                                                       
                    this.tipoAtencion = this.model.historia.admision.atencion.nombre;  
                    this.edad = Util.calculateAge(this.model.historia.admision.paciente.fechaDeNacimiento).toString();                                                       
                    
                    if (this.model.historia.admision.paciente.sexo != null && 
                        this.model.historia.admision.paciente.sexo != undefined)
                        this.sexo = this.model.historia.admision.paciente.sexo.nombre;  

                    this.tipoEntidad = this.model.historia.admision.paciente.tipoEntidad.nombre;  

                    if(this.model.historia.admision.paciente.aseguradora != null){
                        this.aseguradora = this.model.historia.admision.paciente.aseguradora.nombre;                                                        
                    }

                    if(this.model.fechaDeIngreso != null)
                        this.fechaDeIngreso = Util.formattedDateForDatePicker(this.model.fechaDeIngreso);        
                    if(this.model.fechaDeContinuacion != null)
                        this.fechaDeContinuacion = Util.formattedDateForDatePicker(this.model.fechaDeContinuacion);        
                    if(this.model.fechaDeEgreso != null)
                        this.fechaDeEgreso = Util.formattedDateForDatePicker(this.model.fechaDeEgreso);        

                    this.diasDeEstancia = this.model.diasDeEstancia;

                    this.showLoading(false);    

                    this.showLoading(true);    
                    this.epicrisisService.getMedicamentosByIdEpicrisis(this.currentEpicrisisId)
                        .subscribe(
                            data => {                                               
                                this.tratamientoFarmacologicos = data;  
                                this.showLoading(false);             
                        })

                    this.showLoading(true);    
                    this.cie10Service.getById(this.model.historia.admision.idDiagnosticoPrincipal)
                        .subscribe(
                            data => {                                                                               
                                this.cie10 = "(" + data.codigo + ") " + data.nombre;
                                this.showLoading(false);              
                        })
                                          
                    this.medico = this.model.usuario;                    
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

    create(){
        this.model.tratamientoFarmacologico = this.tratamientoFarmacologicos;        
        if(!this.validateCreate()) return;
        
        if(this.fechaDeIngreso != undefined){
            this.model.fechaDeIngreso = 
                new Date(
                    Number(this.fechaDeIngreso.year),
                    Number(this.fechaDeIngreso.month) - 1,
                    Number(this.fechaDeIngreso.day)) 
        }else{
            this.model.fechaDeIngreso = null;
        }        
            
        if(this.fechaDeContinuacion != undefined){
            this.model.fechaDeContinuacion = 
                new Date(
                    Number(this.fechaDeContinuacion.year),
                    Number(this.fechaDeContinuacion.month) - 1,
                    Number(this.fechaDeContinuacion.day)) 
        }else{
            this.model.fechaDeContinuacion =  null;
        }
        
        if(this.fechaDeEgreso != undefined){
            this.model.fechaDeEgreso = 
                new Date(
                    Number(this.fechaDeEgreso.year),
                    Number(this.fechaDeEgreso.month) - 1,
                    Number(this.fechaDeEgreso.day)) 
        }else{
            this.model.fechaDeEgreso = null;
        }
        
        this.model.usuario = this.medico;
        this.showLoading(true);
        this.epicrisisService.update(this.model)
            .subscribe(
                data => {                        
                    this.showLoading(false);
                    /*if(this.fechaDeEgreso != undefined){                        
                        this.getPdf();
                    }*/
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
        
        if(this.model.historia.admision.paciente.identificacion == undefined || this.model.historia.admision.paciente.identificacion == ''){
            this.errores.push({ message: 'Ingrese un paciente'});
            areErrors = true;
        }
        
        if(this.fechaDeIngreso == undefined &&
            this.fechaDeContinuacion == undefined &&
            this.fechaDeEgreso == undefined ){
                this.errores.push({ message: 'Ingrese una fecha de ingreso o fecha de continuación o fecha de egreso'});
                areErrors = true;
        }
        
        if(this.model.justificacion == undefined || this.model.justificacion == null){
            this.errores.push({ message: 'Ingrese una justificación'});
            areErrors = true;
        }
        
        if(this.model.plan == undefined || this.model.plan == null){
            this.errores.push({ message: 'Ingrese un plan'});
            areErrors = true;
        }
        
        if(this.medico == undefined || this.medico == null){
            this.errores.push({ message: 'Seleccione un médico'});
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
}