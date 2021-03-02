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
import { OrdenMedica } from './ordenMedica';
import { OrdenMedicaService } from './ordenMedica.service';
import { MedicamentoService, Medicamento } from '../../listas/medicamentos';
import { Dosis, DosisService } from '../../listas/dosis';
import { User } from '../../seguridad/usuarios/user';
import { MedicamentosOrdenMedica } from './medicamentosOrdenMedica';
import { UserService } from '../../seguridad/usuarios/user.service';
import { ConsultarOrdenMedicaComponent } from './consultarOrdenMedica.component';
import { Administracion } from './administracion';

@Component({
    selector: 'ordenMedica',
    templateUrl: 'ordenMedica.component.html',
})

export class OrdenMedicaComponent implements OnInit {   
    
    model: OrdenMedica;

    solicitantes: User[] = [];  
    quienesEntregan: User[] = [];  
    quienesReciben: User[] = [];  

    medicamentos: Medicamento[] = [];  
    listaDosis: Dosis[] = [];  

    medicamento: Medicamento;
    frecuencia: Dosis;
    cantidadSolicitada: string;
    cantidadEntregada: string;

    medicamentosOrdenMedica: MedicamentosOrdenMedica[] = [];

    fecha: any;    
    public mask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]
    
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

    constructor(
        private ordenMedicaService: OrdenMedicaService,
        private historiaService: HistoriaService,
        private medicamentoService: MedicamentoService,
        private dosisService: DosisService,
        private userService: UserService,
        private router: Router,
        private ngbModal: NgbModal,
        private pacienteService: PacienteService) {
            this.model = new OrdenMedica();
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
                    this.solicitantes = data;                    
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
        this.userService.getAllAuxiliaresFarmacia()
            .subscribe(
                data => {      
                    this.quienesEntregan = data;                    
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
        this.userService.getAllJefesEnfermerias()
            .subscribe(
                data => {      
                    this.quienesReciben = data;                    
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
        
        let med = new MedicamentosOrdenMedica();
        med.medicamento = this.medicamento;                                
        med.administraciones = [];   

        if(this.frecuencia != null)
        {
            med.frecuencia = this.frecuencia;            
        }

        for (var i = 0; i < Number(this.cantidadSolicitada); i++) {
            let ad = new Administracion();
            med.administraciones.push(ad);
        }

        med.cantidadSolicitada = this.cantidadSolicitada;        
        this.medicamentosOrdenMedica.push(med);
        this.clearAgregarForm(); 
    }

    validateAgregar(){
        let areErrors = false;
        this.clearAndcloseErrors();        

        if(this.medicamento == undefined || this.medicamento == null){
            this.errores.push({ message: 'Seleccione un medicamento'});
            areErrors = true;
        }

        if(this.frecuencia == undefined || this.frecuencia == null){
            this.errores.push({ message: 'Seleccione una frecuencia'});
            areErrors = true;
        }

        if(this.cantidadSolicitada == undefined || this.cantidadSolicitada == null){
            this.errores.push({ message: 'Ingrese una cantidad solicitada'});
            areErrors = true;
        }else{
            if(isNaN(Number(this.cantidadSolicitada))){             
                this.errores.push({ message: 'Cantidad solicitada debe ser un número'});
                areErrors = true;
            }
        }

        if(areErrors){
            this.showErrors();
            return false;
        }

        return true;
    }

    deleteMedicamento(index: number) {
        this.medicamentosOrdenMedica.splice(index, 1);
    }

    clearAgregarForm(){
        this.medicamento = new Medicamento();
        this.frecuencia = new Dosis();        
        this.cantidadSolicitada = '';
        this.cantidadEntregada = '';
    }

    create() {
        this.model.medicamentosOrdenMedica = this.medicamentosOrdenMedica;
        if(!this.validateCreate()) return;

        this.showLoading(true);    
        this.ordenMedicaService.create(this.model)
            .subscribe(
                data => {                                                          
                    this.showLoading(false);
                    this.router.navigate(['/layout/procesos/historias/consultar-orden-medica']); 
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

        if(this.fecha == undefined || this.fecha == '' || this.fecha == null)
        {
            this.errores.push({ message: 'Ingrese una fecha'});
            areErrors = true;
        }
        else
        {
            if(!Util.validateDate(this.fecha))
            {
                this.errores.push({ message: 'Ingrese una fecha válida'});
                areErrors = true;
            }
            else
            {
                this.model.fechaDeCreacion = Util.getDate(this.fecha);
            }
        }

        if(this.model.solicitante == undefined || this.model.solicitante == null){
            this.errores.push({ message: 'Seleccione un solicitante'});
            areErrors = true;
        }

        if(this.model.quienEntrega == undefined || this.model.quienEntrega == null){
            this.errores.push({ message: 'Seleccione quien entrega'});
            areErrors = true;
        }

        if(this.model.quienRecibe == undefined || this.model.quienRecibe == null){
            this.errores.push({ message: 'Seleccione quien recibe'});
            areErrors = true;
        }
        
        if(this.model.medicamentosOrdenMedica.length == 0){
            this.errores.push({ message: 'Agregue al menos un medicamento'});
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
}