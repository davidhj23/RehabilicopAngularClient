import { Component, OnInit } from '@angular/core';
import { Util } from '../../../_utils';
import { Historia } from './historia';
import { HistoriaService } from './historia.service';
import { Paciente } from '../pacientes/paciente';
import { Admision } from '../admisiones/admision';
import { PacienteService } from '../pacientes/paciente.service';
import { AdmisionService } from '../admisiones/admision.service';
import { EstadoService, Estado } from '../../listas/estados';
import { Patologico } from './patologico';
import { Antecedente } from './Antecedente';
import { Opcion, OpcionService } from '../../listas/opciones';
import { Farmacologico } from './Farmacologico';
import { TiempoUso, TiempoUsoService } from '../../listas/tiempos-usos';
import { Traumatico } from './traumatico';

@Component({
    selector: 'crearHistorias',
    templateUrl: 'crearHistorias.component.html',
})

export class CrearHistoriasComponent implements OnInit {       
    
    model: Historia;         

    tipoDocumento : string;
    edad : string;
    sexo : string;
    tipoEntidad : string;
    aseguradora : string;

    estados: any[] = []; 
    opciones: any[] = [];     
    tiemposDeUsos: any[] = []; 

    patologicos: Patologico[] = []; 
    idtipoPatologia: string;
    descripcion: string;
    tiempoEvolucion: string;
    estadoPatologico: Estado;

    antecedentes: Antecedente[] = []; 
    idtipoAntecente: string;
    institucion: string;
    numero: string;
    fechaUltimaHospitalizacion: string;    
    primeraHospitalizacion: Opcion;

    traumaticos: Traumatico[] = []; 
    trauma: string;
	tiempoEvolucionTraumatico: string;	
    secuelas: string;
	compromisoConciencia: Opcion;

    farmacologicos: Farmacologico[] = []; 
    medicamento: string;
    dosis: string;       
	eficacia: Opcion;    
	esAdverso: Opcion;
    tiempoDeUso: TiempoUso;

    loading = false;        
    
    areErrors = false;
    errores: any[] = [];       
    
    fechaDeInicio: string;    
    public mask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]

    constructor(
        private historiaService: HistoriaService,
        private admisionService: AdmisionService,
        private estadoService: EstadoService,
        private opcionService: OpcionService,
        private tiempoUsoService: TiempoUsoService) {
        
        this.model = new Historia();
        this.model.admision = new Admision();
        this.model.admision.paciente = new Paciente();
    }

    ngOnInit() {    
        this.fillSelects();
    }    

    fillSelects(){      
        this.showLoading(true);    
        this.estadoService.getAll()
            .subscribe(
                data => {      
                    this.estados = data;                    
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
        this.tiempoUsoService.getAll()
            .subscribe(
                data => {      
                    this.tiemposDeUsos = data;                    
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

    guardar() {        
        if(!this.validateCreate()) return;

        this.model.patologicos = [];
        this.model.patologicos = this.patologicos;
        this.model.antecedentes = this.antecedentes;

        this.showLoading(true);    
        this.historiaService.create(this.model)
            .subscribe(
                data => {                        
                    this.clearModel(); 
                    this.clearAdmisionModel();
                                 
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

        if(this.model.admision.paciente.identificacion == undefined || this.model.admision.paciente.identificacion == ''){
            this.errores.push({ message: 'Ingrese un paciente'});
            areErrors = true;
        }

        if(areErrors){
            this.showErrors();
            return false;
        }

        return true;
    }

    keytab(event: Event){
        let areErrors = false;
        this.clearAndcloseErrors();              

        if(this.model.admision.paciente.identificacion == undefined || this.model.admision.paciente.identificacion == ''){
            this.errores.push({ message: 'Ingrese un paciente'});                        
            this.showErrors();
            return;
        }

        this.showLoading(true);    
        this.admisionService.getAdmisionByIdentificacionPaciente(this.model.admision.paciente.identificacion)
            .subscribe(
                data => {      
                    if(data != null){
                        this.model.admision = data;  
                        this.tipoDocumento = this.model.admision.paciente.tipoDocumento.nombre;                                                       
                        this.edad = Util.formattedDate( this.model.admision.paciente.fechaDeNacimiento);                                                       
                        this.sexo = this.model.admision.paciente.sexo.nombre;                                                       
                        this.tipoEntidad = this.model.admision.paciente.tipoEntidad.nombre;                                                       
                        this.aseguradora = this.model.admision.paciente.aseguradora.nombre;                                                       
                    }else{
                        this.errores.push({ message: 'No se encontró un paciente con esa identificación'});                        
                        this.showErrors();                        
                        this.clearAdmisionModel();
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

    addPatologico(){        
        let patologico = new Patologico();
        patologico.tipo = this.idtipoPatologia;
        patologico.descripcion = this.descripcion;
        patologico.tiempoEvolucion = this.tiempoEvolucion;
        patologico.estado = this.estadoPatologico;

        this.patologicos.push(patologico);
        this.clearPatologicoForm();
    }

    deletePatologico(index: number) {
        this.patologicos.splice(index, 1);
    }

    addAntecedente(){     
        let areErrors = false;
        this.clearAndcloseErrors();  

        if(this.fechaUltimaHospitalizacion == undefined || this.fechaUltimaHospitalizacion == ''){
            this.errores.push({ message: 'Ingrese una fecha de útlima hospitalización'});
            areErrors = true;
        }
        else if(!Util.validateDate(this.fechaUltimaHospitalizacion)){
            this.errores.push({ message: 'Ingrese una fecha de útlima hospitalización válida'});
            areErrors = true;
        }    
        
        if(areErrors){
            this.showErrors();
            return;
        }

        let antecedente = new Antecedente();
        antecedente.tipo = this.idtipoAntecente;
        antecedente.institucion = this.institucion;
        antecedente.numero = this.numero;
        antecedente.fechaUltimaHospitalizacion = Util.getDate(this.fechaUltimaHospitalizacion);
        antecedente.esLaPrimeraHospitalizacion = this.primeraHospitalizacion;

        this.antecedentes.push(antecedente);
        this.clearAntecedenteForm();
    }

    deleteAntecedente(index: number) {
        this.antecedentes.splice(index, 1);
    }

    addTraumatico(){
        let traumatico = new Traumatico();
        traumatico.trauma = this.trauma;
        traumatico.tiempoEvolucion = this.tiempoEvolucionTraumatico;       
        traumatico.secuelas = this.secuelas;    
        traumatico.compromisoConciencia = this.compromisoConciencia;        

        this.traumaticos.push(traumatico);
        this.clearTraumaticoForm();
    }

    deleteTraumatico(index: number) {
        this.traumaticos.splice(index, 1);
    }

    addFarmacologico(){
        let farmacologico = new Farmacologico();
        farmacologico.medicamento = this.medicamento;
        farmacologico.dosis = this.dosis;       
        farmacologico.eficacia = this.eficacia;    
        farmacologico.esAdverso = this.esAdverso;
        farmacologico.tiempoDeUso = this.tiempoDeUso;

        this.farmacologicos.push(farmacologico);
        this.clearFarmacologicoForm();
    }

    deleteFarmacologico(index: number) {
        this.farmacologicos.splice(index, 1);
    }

    showLoading(loading: boolean) {
        this.loading = loading;
    }

    showErrors(){   
        this.areErrors = true;        
        this.showLoading(false);
        window.scroll(0,0);
        setTimeout(function() {
            this.clearAndcloseErrors();
        }.bind(this), 10000); 
    }

    clearAndcloseErrors(){
        this.errores = [];
        this.areErrors = false;        
    }

    clearModel(){        
        this.model = new Historia();    
        this.patologicos = [];
        this.antecedentes = [];
        this.traumaticos = [];
        this.farmacologicos = [];
    }

    clearAdmisionModel(){
        this.model.admision = new Admision();
        this.model.admision.paciente = new Paciente();        

        this.tipoDocumento = '';
        this.edad = '';
        this.sexo = '';
        this.tipoEntidad = '';
        this.aseguradora = '';        
    }

    clearPatologicoForm(){
        this.idtipoPatologia = '';
        this.descripcion = '';
        this.tiempoEvolucion = '';
        this.estadoPatologico = new Estado();
    }

    clearAntecedenteForm(){        
        this.idtipoAntecente = '';
        this.institucion = '';
        this.numero = '';
        this.fechaUltimaHospitalizacion = '';    
        this.primeraHospitalizacion = new Opcion();
    }

    clearTraumaticoForm(){        
        this.trauma = '';
        this.tiempoEvolucionTraumatico = '';
        this.secuelas = '';
        this.compromisoConciencia = new Opcion();
    }

    clearFarmacologicoForm(){        
        this.medicamento = '';
        this.dosis = '';
        this.eficacia = new Opcion();
        this.esAdverso = new Opcion();    
        this.tiempoDeUso = new TiempoUso();
    }
}