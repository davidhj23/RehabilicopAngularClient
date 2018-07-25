import { Component, OnInit } from '@angular/core';
import { PacienteService } from './paciente.service';
import { Paciente } from './paciente';
import { TipoDocumentoService, TipoDocumento, TiposDocumentosComponent } from '../../listas/tipos-documentos';
import { EstadoCivilService, EstadoCivil } from '../../listas/estados-civiles';
import { AseguradoraService, Aseguradora } from '../../listas/aseguradoras';
import { TipoEntidadService, TipoEntidad } from '../../listas/tipos-entidades';
import { Util } from '../../../_utils';
import { CamaService, Cama } from '../../listas/camas';
import { AtencionService, Atencion } from '../../listas/atenciones';
import { SedeService, Sede } from '../../listas/sedes';
import { UserService } from '../../seguridad/usuarios/user.service';
import { User } from '../../seguridad/usuarios/user';
import { ParentescoService, Parentesco } from '../../listas/parentescos';
import { Cie10Service, Cie10 } from '../../listas/cie10s';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, tap, switchMap, catchError} from 'rxjs/operators';
import { of } from '../../../../../node_modules/rxjs/observable/of';
import { RegimenService, Regimen } from '../../listas/regimenes';
import { EscolaridadService, Escolaridad } from '../../listas/escolaridades';

@Component({
    selector: 'crearPacientes',
    templateUrl: 'crearPacientes.component.html',
})

export class CrearPacientesComponent implements OnInit {       
    
    model: Paciente;           
    tiposDocumentos: any[] = [];      
    estadosCiviles: any[] = []; 
    aseguradoras: any[] = [];
    tipoEntidades: any[] = []; 
    regimenes: any[] = [];
    escolaridades: any[] = []; 

    idTipoDocumento: string;    
    idEstadoCivil: string;
    idAseguradora: string;
    idTipoEntidad: string;
    idRegimen: string;
    idEscolaridad: string;

    loading = false;        
    
    areErrors = false;
    errores: any[] = [];       
    
    fechaDeNacimiento: string;
    public mask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]

    constructor(
        private pacienteService: PacienteService,
        private tipoDocumentoService: TipoDocumentoService,
        private estadoCivilService: EstadoCivilService,
        private aseguradoraService: AseguradoraService,
        private tipoEntidadService: TipoEntidadService,
        private regimenService: RegimenService,
        private escolaridadService: EscolaridadService) {
        
        this.model = new Paciente();
    }

    ngOnInit() {    
        this.fillSelects();
    }    

    fillSelects(){
        this.showLoading(true);    
        this.tipoDocumentoService.getAll()
            .subscribe(
                data => {      
                    this.tiposDocumentos = data;          
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
        this.estadoCivilService.getAll()
            .subscribe(
                data => {      
                    this.estadosCiviles = data;           
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
        this.aseguradoraService.getAll()
            .subscribe(
                data => {      
                    this.aseguradoras = data;             
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
        this.tipoEntidadService.getAll()
            .subscribe(
                data => {      
                    this.tipoEntidades = data;            
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
        this.regimenService.getAll()
            .subscribe(
                data => {      
                    this.regimenes = data;                
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
        this.escolaridadService.getAll()
            .subscribe(
                data => {      
                    this.escolaridades = data;                                                          
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

        this.model.tipoDocumento = new TipoDocumento();        

        let tipoDoc = new TipoDocumento();
        tipoDoc.idTipoDocumento = this.idTipoDocumento;          
        this.model.tipoDocumento = tipoDoc; 
        
        if(this.idEstadoCivil != null){
            this.model.estadoCivil = new EstadoCivil();        

            let estadoCivil = new EstadoCivil();
            estadoCivil.idEstadoCivil = this.idEstadoCivil;          
            this.model.estadoCivil = estadoCivil; 
        }

        if(this.idAseguradora != null){
            this.model.aseguradora = new Aseguradora();        

            let aseguradora = new Aseguradora();
            aseguradora.idAseguradora = this.idAseguradora;          
            this.model.aseguradora = aseguradora; 
        }
        
        if(this.idTipoEntidad != null){
            this.model.tipoEntidad = new TipoEntidad();        

            let tipoEntidad = new TipoEntidad();
            tipoEntidad.idTipoEntidad = this.idTipoEntidad;          
            this.model.tipoEntidad = tipoEntidad; 
        }

        if(this.idRegimen != null){
            this.model.regimen = new Regimen();        

            let regimen = new Regimen();
            regimen.idRegimen = this.idRegimen;          
            this.model.regimen = regimen; 
        }

        if(this.idEscolaridad != null){
            this.model.escolaridad = new Escolaridad();        

            let escolaridad = new Escolaridad();
            escolaridad.idEscolaridad = this.idEscolaridad;          
            this.model.escolaridad = escolaridad; 
        }

        this.showLoading(true);    
        this.pacienteService.create(this.model)
            .subscribe(
                data => {                        
                    this.clearModel();  
                    this.idTipoDocumento = '';
                    this.idEstadoCivil = ''; 
                    this.idTipoEntidad = ''; 
                    this.idAseguradora = ''; 
                    this.fechaDeNacimiento = ''; 
                    this.idRegimen = ''; 
                    this.idEscolaridad = ''; 
                    this.model.sexo = ''; 
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

        if(this.idTipoDocumento == undefined || this.idTipoDocumento == ''){
            this.errores.push({ message: 'Seleccione un tipo de documento'});
            areErrors = true;
        }

        if(this.model.identificacion == undefined || this.model.identificacion == ''){
            this.errores.push({ message: 'Ingrese la cédula'});
            areErrors = true;
        }

        if(this.model.nombres == undefined || this.model.nombres == ''){
            this.errores.push({ message: 'Ingrese nombres'});
            areErrors = true;
        }

        if(this.model.apellidos == undefined || this.model.apellidos == ''){
            this.errores.push({ message: 'Ingrese apellidos'});
            areErrors = true;
        }        
         
        if(this.fechaDeNacimiento == undefined || this.fechaDeNacimiento == ''){
            this.errores.push({ message: 'Ingrese una fecha de nacimiento'});
            areErrors = true;
        }
        else if(!Util.validateDate(this.fechaDeNacimiento)){
            this.errores.push({ message: 'Ingrese una fecha de nacimiento válida'});
            areErrors = true;
        }else{
            this.model.fechaDeNacimiento = Util.getDate(this.fechaDeNacimiento);
        }

        if(this.model.email != undefined && this.model.email != ''){
            if(!Util.validateEmail(this.model.email)){
                this.errores.push({ message: 'Ingrese un email válido'});
                areErrors = true;
            }
        }

        /*if(this.idEstadoCivil == undefined || this.idEstadoCivil == ''){
            this.errores.push({ message: 'Seleccione un estado civil'});
            areErrors = true;
        }

        if(this.idAseguradora == undefined || this.idAseguradora == ''){
            this.errores.push({ message: 'Seleccione una aseguradora'});
            areErrors = true;
        }

        if(this.idTipoEntidad == undefined || this.idTipoEntidad == ''){
            this.errores.push({ message: 'Seleccione un tipo de entidad'});
            areErrors = true;
        }*/

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
        this.model = new Paciente();
    }
}