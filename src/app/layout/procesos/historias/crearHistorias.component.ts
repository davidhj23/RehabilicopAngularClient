import { Component, OnInit } from '@angular/core';
import { Util } from '../../../_utils';
import { Historia } from './historia';
import { HistoriaService } from './historia.service';
import { Paciente } from '../pacientes/paciente';
import { Admision } from '../admisiones/admision';
import { PacienteService } from '../pacientes/paciente.service';
import { AdmisionService } from '../admisiones/admision.service';

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

    loading = false;        
    
    areErrors = false;
    errores: any[] = [];       
    
    fechaDeInicio: string;    
    public mask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]

    constructor(
        private historiaService: HistoriaService,
        private admisionService: AdmisionService,
        private pacienteService: PacienteService) {
        
        this.model = new Historia();
        this.model.admision = new Admision();
        this.model.admision.paciente = new Paciente();
    }

    ngOnInit() {    
        this.fillSelects();
    }    

    fillSelects(){      

    }

    guardar() {        
        if(!this.validateCreate()) return;

        this.showLoading(true);    
        this.historiaService.create(this.model)
            .subscribe(
                data => {                        
                    this.clearModel(); 

                    this.tipoDocumento = '';
                    this.edad = '';
                    this.sexo = '';
                    this.tipoEntidad = '';
                    this.aseguradora = '';
                                 
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
        this.model.admision = new Admision();
        this.model.admision.paciente = new Paciente();
    }
}