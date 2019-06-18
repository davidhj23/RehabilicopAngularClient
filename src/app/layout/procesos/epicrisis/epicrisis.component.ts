import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
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
import { MedicamentoService, Medicamento } from '../../listas/medicamentos';
import { Dosis, DosisService } from '../../listas/dosis';
import { User } from '../../seguridad/usuarios/user';
import { UserService } from '../../seguridad/usuarios/user.service';
import { Epicrisis } from './epicrisis';
import { TratamientoFarmacologico } from './TratamientoFarmacologico';
import { EpicrisisService } from './epicrisis.service';
import { Cie10, Cie10Service } from '../../listas/cie10s';
import { modelGroupProvider } from '@angular/forms/src/directives/ng_model_group';

@Component({
    selector: 'epicrisis',
    templateUrl: 'epicrisis.component.html',
})

export class EpicrisisComponent implements OnInit {   
    
    model: Epicrisis;

    medicamentos: Medicamento[] = [];  
    listaDosis: Dosis[] = [];  
    medicos: User[] = [];  

    medicamento: Medicamento;
    dosis: Dosis;
    desde: any;        
    hasta: any;        

    tratamientoFarmacologicos: TratamientoFarmacologico[] = [];
    
    tipoDocumento: string;
    edad: string;
    sexo: string;
    tipoEntidad: string;
    aseguradora: string;

    cie10: string;
    medico: User;

    fechaDeIngreso: any;
	fechaDeContinuacion: any;
    fechaDeEgreso: any;
    diasDeEstancia: string;

    loading = false;        
    rowsOnPage = 5;
    
    areErrors = false;
    errores: any[] = []; 

    constructor(
        private epicrisisService: EpicrisisService,
        private historiaService: HistoriaService,
        private medicamentoService: MedicamentoService,
        private dosisService: DosisService,
        private userService: UserService,
        private router: Router,
        private ngbModal: NgbModal,
        private pacienteService: PacienteService,
        private cie10Service: Cie10Service) {
            this.model = new Epicrisis();
            this.model.historia = new Historia();
            this.model.historia.admision = new Admision();
            this.model.historia.admision.paciente = new Paciente();
    }

    ngOnInit() {    
        this.fillSelects();            
    }

    private fillSelects(){
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
    }

    agregar(){
        if(!this.validateAgregar()) return;     
        
        let tf = new TratamientoFarmacologico();
        tf.medicamento = this.medicamento;                        
        tf.dosis = this.dosis;
        tf.desde = new Date(Number(this.desde.year), Number(this.desde.month) - 1, Number(this.desde.day)); 
        tf.hasta = new Date(Number(this.hasta.year), Number(this.hasta.month) - 1, Number(this.hasta.day)); 
        this.tratamientoFarmacologicos.push(tf);
        this.clearAgregarForm();  
    }

    validateAgregar(){
        let areErrors = false;
        this.clearAndcloseErrors();        

        if(this.medicamento == undefined || this.medicamento == null){
            this.errores.push({ message: 'Seleccione un medicamento'});
            areErrors = true;
        }

        if(this.dosis == undefined || this.dosis == null){
            this.errores.push({ message: 'Seleccione una dosis'});
            areErrors = true;
        }

        if(this.desde == undefined || this.desde == null){
            this.errores.push({ message: 'Ingrese una fecha desde'});
            areErrors = true;
        }

        if(this.hasta == undefined || this.hasta == null){
            this.errores.push({ message: 'Ingrese una fecha desde'});
            areErrors = true;
        }

        if(areErrors){
            this.showErrors();
            return false;
        }

        return true;
    }

    clearAgregarForm(){
        this.medicamento = new Medicamento();
        this.dosis = new Dosis();
        this.desde = new Date();
        this.hasta = new Date();
    }

    getPdf(){
        this.showLoading(true);    
        this.epicrisisService.generateReport(this.model.historia.admision.paciente.identificacion)
            .subscribe(
                data => {                                                          
                    this.showLoading(false);
                    let file = new Blob([data], { type: 'application/pdf' });            
                    var fileURL = URL.createObjectURL(file);
                    window.open(fileURL);
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
        this.model.tratamientoFarmacologico = this.tratamientoFarmacologicos;        
        if(!this.validateCreate()) return;

        this.model.fechaDeCreacion = new Date();

        if(this.fechaDeIngreso != undefined){
            this.model.fechaDeIngreso = 
                new Date(
                    Number(this.fechaDeIngreso.year),
                    Number(this.fechaDeIngreso.month) - 1,
                    Number(this.fechaDeIngreso.day)) 
        }else{
            if(this.fechaDeContinuacion != undefined){
                this.model.fechaDeContinuacion = 
                    new Date(
                        Number(this.fechaDeContinuacion.year),
                        Number(this.fechaDeContinuacion.month) - 1,
                        Number(this.fechaDeContinuacion.day)) 
            }
            else{
                if(this.fechaDeEgreso != undefined){
                    this.model.fechaDeEgreso = 
                        new Date(
                            Number(this.fechaDeEgreso.year),
                            Number(this.fechaDeEgreso.month) - 1,
                            Number(this.fechaDeEgreso.day)) 
                }
            }
        }

        this.model.usuario = this.medico;

        this.showLoading(true);    
        this.epicrisisService.create(this.model)
            .subscribe(
                data => {                                                          
                    this.showLoading(false);
                    if(this.fechaDeEgreso != undefined){
                        this.getPdf();
                    }
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
        
        if(this.model.tratamientoFarmacologico.length == 0){
            this.errores.push({ message: 'Agregue al menos un medicamento'});
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
                        
                        this.showLoading(true);    
                        this.cie10Service.getById(this.model.historia.admision.idDiagnosticoPrincipal)
                            .subscribe(
                                data => {                                                                               
                                    this.cie10 = "(" + data.codigo + ") " + data.nombre;
                                    this.showLoading(false);              
                            })

                        this.showLoading(false);   
                        
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