import { Component, OnInit } from '@angular/core';
import { PacienteService } from './paciente.service';
import { Paciente } from './paciente';
import { TipoDocumentoService, TipoDocumento } from '../../listas/tipos-documentos';
import { ActivatedRoute } from '@angular/router';
import { EstadoCivil, EstadoCivilService } from '../../listas/estados-civiles';
import { AseguradoraService, Aseguradora } from '../../listas/aseguradoras';
import { TipoEntidadService, TipoEntidad } from '../../listas/tipos-entidades';
import { Util } from '../../../_utils';
import { Observable } from '../../../../../node_modules/rxjs';
import { tap, catchError, switchMap, debounceTime } from '../../../../../node_modules/rxjs/operators';
import { of } from '../../../../../node_modules/rxjs/observable/of';
import { SedeService } from '../../listas/sedes';
import { AtencionService } from '../../listas/atenciones';
import { CamaService } from '../../listas/camas';
import { ParentescoService } from '../../listas/parentescos';
import { UserService } from '../../seguridad/usuarios/user.service';
import { Cie10Service } from '../../listas/cie10s';

@Component({
    selector: 'editarPacientes',
    templateUrl: 'editarPacientes.component.html',
})

export class EditarPacientesComponent implements OnInit {       
    
    currentPacienteId: string;

    model: Paciente;       
    tiposDocumentos: any[] = [];  
    estadosCiviles: any[] = [];  
    aseguradoras: any[] = [];
    tipoEntidades: any[] = [];
    
    sedes: any[] = []; 
    atenciones: any[] = [];
    camas: any[] = []; 
    medicos: any[] = [];
    enfermeros: any[] = []; 

    parentescos: any[] = []; 

    idTipoDocumento: string;    
    idEstadoCivil: string;
    idAseguradora: string;
    idTipoEntidad: string;

    idSede: string;
    idAtencion: string;
    idCama: string;
    idMedico: string;
    idEnfermero: string;

    idParentesco: string;

    loading = false;        
    
    areErrors = false;
    errores: any[] = []; 
    
    fechaDeNacimiento: string;
    fechaDeIngreso: string;
    fechaDeRemision: string;
    public mask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]

    constructor(
        private pacienteService: PacienteService,
        private tipoDocumentoService: TipoDocumentoService,
        private estadoCivilService: EstadoCivilService,
        private aseguradoraService: AseguradoraService,
        private tipoEntidadService: TipoEntidadService,
        private sedeService: SedeService,
        private atencionService: AtencionService,
        private camaService: CamaService,
        private usuarioService: UserService,
        private parentescoService: ParentescoService,
        private cie10Service: Cie10Service,
        private route: ActivatedRoute) {

        this.model = new Paciente();

        this.route.params.subscribe( 
            params => {
                this.currentPacienteId = params['id'];
            }
        );
    }

    ngOnInit() {   
        this.fillSelects();
                 
        this.showLoading(true);    
        this.pacienteService.getById(this.currentPacienteId)
            .subscribe(
                data => {                                               
                    this.model = data;  
                    this.idTipoDocumento = this.model.tipoDocumento.idTipoDocumento;
                    this.idEstadoCivil = this.model.estadoCivil.idEstadoCivil;                    
                    this.idAseguradora = this.model.aseguradora.idAseguradora;                    
                    this.idTipoEntidad = this.model.tipoEntidad.idTipoEntidad;    
                    this.idSede = this.model.sede.idSede;    
                    this.idAtencion = this.model.atencion.idAtencion;    
                    this.idCama = this.model.cama.idCama;    
                    this.idMedico = this.model.idMedico;    
                    this.idEnfermero = this.model.idEnfermero;    
                    this.idParentesco = this.model.parentesco.idParentesco;    
                    this.fechaDeNacimiento = Util.formattedDate(this.model.fechaDeNacimiento);                        
                    this.fechaDeIngreso = Util.formattedDate(this.model.fechaDeIngreso);                        
                    this.fechaDeRemision = Util.formattedDate(this.model.fechaDeRemision);    
                    this.diagnosticoPrincipal = this.model.diagnosticoPrincipal;                    
                    this.diagnosticoSecundario = this.model.diagnosticoSecundario;
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
        this.sedeService.getAll()
            .subscribe(
                data => {      
                    this.sedes = data;                                                      
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
        this.atencionService.getAll()
            .subscribe(
                data => {      
                    this.atenciones = data;                  
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
        this.camaService.getAll()
            .subscribe(
                data => {      
                    this.camas = data;                  
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
        this.usuarioService.getAllMedicos()
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
        this.usuarioService.getAllEnfermeros()
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

        this.showLoading(true);    
        this.parentescoService.getAll()
            .subscribe(
                data => {      
                    this.parentescos = data;                                      
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

        this.model.estadoCivil = new EstadoCivil();

        let estadoCivil = new EstadoCivil();
        estadoCivil.idEstadoCivil = this.idEstadoCivil;
        this.model.estadoCivil = estadoCivil;    
        
        this.model.aseguradora = new Aseguradora();        

        let aseguradora = new Aseguradora();
        aseguradora.idAseguradora = this.idAseguradora;          
        this.model.aseguradora = aseguradora; 

        this.model.tipoEntidad = new TipoEntidad();        

        let tipoEntidad = new TipoEntidad();
        tipoEntidad.idTipoEntidad = this.idTipoEntidad;          
        this.model.tipoEntidad = tipoEntidad; 
        
        this.showLoading(true);               
        this.pacienteService.update(this.model)
            .subscribe(
                data => {                        
                    this.model = data;                    
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

    diagnosticoPrincipal: any;

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

    diagnosticoSecundario: any;

    searchingSecundario = false;
    searchFailedSecundario = false;
    formatterSecundario = (x: {codigo: string, nombre: string}) => `(${x.codigo}) ${x.nombre}`;

    searchSecundario = (text$: Observable<string>) =>
        text$.pipe(
        debounceTime(200),
        tap(() => this.searchingSecundario = true),
        switchMap(
            term => term.length < 3 ? [] :
                this.cie10Service.search(term)
                    .pipe(
                        tap(() => this.searchFailedSecundario = false),
                        catchError(() => {
                            this.searchFailedSecundario = true;
                            return of([]);
                        })
                    )
        ),
        tap(() => this.searchingSecundario  = false)
    )
    
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

        if(this.model.email == undefined || this.model.email == ''){
            this.errores.push({ message: 'Ingrese un email'});
            areErrors = true;
        }
        else if(!Util.validateEmail(this.model.email)){
            this.errores.push({ message: 'Ingrese un email válido'});
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
        
        if(this.idEstadoCivil == undefined || this.idEstadoCivil == ''){
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
        }

        if(this.fechaDeIngreso == undefined || this.fechaDeIngreso == ''){
            this.errores.push({ message: 'Ingrese una fecha de ingreso'});
            areErrors = true;
        }
        else if(!Util.validateDate(this.fechaDeIngreso)){
            this.errores.push({ message: 'Ingrese una fecha de ingreso válida'});
            areErrors = true;
        }else{
            this.model.fechaDeIngreso = Util.getDate(this.fechaDeIngreso);
        }
        
        if(this.idSede == undefined || this.idSede == ''){
            this.errores.push({ message: 'Seleccione una sede'});
            areErrors = true;
        }

        if(this.idAtencion == undefined || this.idAtencion == ''){
            this.errores.push({ message: 'Seleccione un tipo de atención'});
            areErrors = true;
        }

        if(this.idCama == undefined || this.idCama == ''){
            this.errores.push({ message: 'Seleccione una cama'});
            areErrors = true;
        }

        if(this.idMedico == undefined || this.idMedico == ''){
            this.errores.push({ message: 'Seleccione un médico'});
            areErrors = true;
        }

        if(this.idEnfermero == undefined || this.idEnfermero == ''){
            this.errores.push({ message: 'Seleccione un enfermero'});
            areErrors = true;
        }

        if(this.fechaDeRemision == undefined || this.fechaDeRemision == ''){
            this.errores.push({ message: 'Ingrese una fecha de remisión'});
            areErrors = true;
        }
        else if(!Util.validateDate(this.fechaDeRemision)){
            this.errores.push({ message: 'Ingrese una fecha de remisión válida'});
            areErrors = true;
        }else{
            this.model.fechaDeRemision = Util.getDate(this.fechaDeRemision);
        }

        if(this.model.numeroRemision == undefined || this.model.numeroRemision == ''){
            this.errores.push({ message: 'Ingrese numero de remisión'});
            areErrors = true;
        }

        if(this.model.acompanante == undefined || this.model.acompanante == ''){
            this.errores.push({ message: 'Ingrese acompañante'});
            areErrors = true;
        }

        if(this.idParentesco == undefined || this.idParentesco == ''){

            this.errores.push({ message: 'Seleccione un parentesco'});
            areErrors = true;
        }

        if(this.model.direccionAcompanante == undefined || this.model.direccionAcompanante == ''){
            this.errores.push({ message: 'Ingrese dirección acompañante'});
            areErrors = true;
        }

        if(this.model.telefonoAcompanante == undefined || this.model.telefonoAcompanante == ''){
            this.errores.push({ message: 'Ingrese teléfono acompañante'});
            areErrors = true;
        }

        if(this.model.ciudadAcompanante == undefined || this.model.ciudadAcompanante == ''){
            this.errores.push({ message: 'Ingrese ciudad acompañante'});
            areErrors = true;
        }

        if(this.diagnosticoPrincipal == null){
            this.errores.push({ message: 'Ingrese un diagnostico principal'});
            areErrors = true;
        }

        if(this.diagnosticoSecundario == null){
            this.errores.push({ message: 'Ingrese un diagnostico secundario'});
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