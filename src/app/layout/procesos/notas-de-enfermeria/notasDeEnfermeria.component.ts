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
import { NotasDeEnfermeria } from './notasDeEnfermeria';
import { NotasDeEnfermeriaService } from './notasDeEnfermeria.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'notasDeEnfermeria',
    templateUrl: 'notasDeEnfermeria.component.html',
})

export class NotasDeEnfermeriaComponent implements OnInit {   
    
    model: NotasDeEnfermeria;
    
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
    allNotasDeEnfermeria: any[] = [];  
    tipoAtencion: string;

    constructor(        
        private historiaService: HistoriaService,        
        private pacienteService: PacienteService,
        private notasDeEnfermeriaService: NotasDeEnfermeriaService,
        private ngbModal: NgbModal) {

            this.model = new NotasDeEnfermeria();
            this.model.historia = new Historia();
            this.model.historia.admision = new Admision();
            this.model.historia.admision.paciente = new Paciente();
    }

    ngOnInit() {          
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
                        this.tipoAtencion = this.model.historia.admision.atencion.nombre;
                        this.edad = Util.formattedDate( this.model.historia.admision.paciente.fechaDeNacimiento);                                                       
                        
                        if (this.model.historia.admision.paciente.sexo != null && 
                            this.model.historia.admision.paciente.sexo != undefined)
                            this.sexo = this.model.historia.admision.paciente.sexo.nombre;  

                        this.tipoEntidad = this.model.historia.admision.paciente.tipoEntidad.nombre;  

                        if(this.model.historia.admision.paciente.aseguradora != null){
                            this.aseguradora = this.model.historia.admision.paciente.aseguradora.nombre;                                                        
                        }
                        
                        this.getNotasDeEnfermeriaByPaciente(this.model.historia.admision.paciente.identificacion);
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
        
        this.showLoading(true);    
        this.notasDeEnfermeriaService.create(this.model)
            .subscribe(
                data => {                                                          
                    this.showLoading(false);                     
                    this.getNotasDeEnfermeriaByPaciente(this.model.historia.admision.paciente.identificacion);                                               
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

    getNotasDeEnfermeriaByPaciente(idPaciente: String){
        this.showLoading(true);    
        this.notasDeEnfermeriaService.getNotasDeEnfermeriaByPaciente(idPaciente)
            .subscribe(
                data => {    
                    this.allNotasDeEnfermeria = data;                                        
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
        
        if(this.model.descripcion == undefined 
            || this.model.descripcion == null
            || this.model.descripcion == ''){
            this.errores.push({ message: 'Ingrese una descripción'});
            areErrors = true;
        }

        if(areErrors){
            this.showErrors();
            return false;
        }

        return true;
    }

    delete(id: string, content: any) {   
        this.clearAndcloseErrors();  
        this.ngbModal.open(content).result.then((result) => {
            this.showLoading(true);
            this.notasDeEnfermeriaService.delete(id)
                .subscribe(data => {                    
                    this.getNotasDeEnfermeriaByPaciente(this.model.historia.admision.paciente.identificacion);               
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

    clearAgregarForm(){                        
        this.fecha = null;                
        this.model.ampm = null;
        this.model.hora = null;
        this.model.descripcion = '';
    }
}