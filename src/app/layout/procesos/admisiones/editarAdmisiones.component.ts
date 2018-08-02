import { Component, OnInit } from '@angular/core';
import { TipoDocumentoService, TipoDocumento } from '../../listas/tipos-documentos';
import { ActivatedRoute } from '@angular/router';
import { EstadoCivil, EstadoCivilService } from '../../listas/estados-civiles';
import { AseguradoraService, Aseguradora } from '../../listas/aseguradoras';
import { TipoEntidadService, TipoEntidad } from '../../listas/tipos-entidades';
import { Util } from '../../../_utils';
import { Observable } from '../../../../../node_modules/rxjs';
import { tap, catchError, switchMap, debounceTime } from '../../../../../node_modules/rxjs/operators';
import { of } from '../../../../../node_modules/rxjs/observable/of';
import { SedeService, Sede } from '../../listas/sedes';
import { AtencionService, Atencion } from '../../listas/atenciones';
import { CamaService, Cama } from '../../listas/camas';
import { ParentescoService, Parentesco } from '../../listas/parentescos';
import { UserService } from '../../seguridad/usuarios/user.service';
import { Cie10Service, Cie10 } from '../../listas/cie10s';
import { Admision } from './admision';
import { AdmisionService } from './admision.service';
import { Paciente } from '../pacientes/paciente';

@Component({
    selector: 'editarAdmisiones',
    templateUrl: 'editarAdmisiones.component.html',
})

export class EditarAdmisionesComponent implements OnInit {       
    
    currentAdmisionId: string;

    model: Admision;         

    sedes: any[] = []; 
    atenciones: any[] = [];
    camas: any[] = []; 
    medicos: any[] = [];
    enfermeros: any[] = []; 

    parentescos: any[] = []; 
    
    idSede: string;
    idAtencion: string;
    idCama: string;
    idMedico: string;
    idEnfermero: string;

    idParentesco: string;

    tipoDocumento : string;
    edad : string;
    sexo : string;
    tipoEntidad : string;
    aseguradora : string;

    loading = false;        
    
    areErrors = false;
    errores: any[] = [];       
    
    fechaDeNacimiento: string;
    fechaDeIngreso: string;
    fechaDeRemision: string;
    public mask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]

    constructor(
        private admisionService: AdmisionService,
        private sedeService: SedeService,
        private atencionService: AtencionService,
        private camaService: CamaService,
        private usuarioService: UserService,
        private parentescoService: ParentescoService,
        private cie10Service: Cie10Service,
        private route: ActivatedRoute) {

        this.model = new Admision();
        this.model.paciente = new Paciente();

        this.route.params.subscribe( 
            params => {
                this.currentAdmisionId = params['id'];
            }
        );
    }

    ngOnInit() {   
        this.fillSelects();
                 
        this.showLoading(true);    
        this.admisionService.getById(this.currentAdmisionId)
            .subscribe(
                data => {                                               
                    this.model = data;         

                    this.model.paciente = data.paciente;  
                    this.tipoDocumento = this.model.paciente.tipoDocumento.nombre;                                                       
                    this.edad = Util.formattedDate( this.model.paciente.fechaDeNacimiento);                                                       
                    this.sexo = this.model.paciente.sexo.nombre;                                                       
                    this.tipoEntidad = this.model.paciente.tipoEntidad.nombre;                                                       
                    this.aseguradora = this.model.paciente.aseguradora.nombre;                                                       
                    this.idAtencion = this.model.atencion.idAtencion;    

                    this.idSede = this.model.sede.idSede;    
                    this.getCamas(this.idSede);
                    this.idCama = this.model.cama.idCama;    

                    this.idMedico = this.model.idMedico;    
                    this.idEnfermero = this.model.idEnfermero;    
                    this.idParentesco = this.model.parentesco.idParentesco;                        
                    this.fechaDeIngreso = Util.formattedDate(this.model.fechaDeIngreso);                        
                    this.fechaDeRemision = Util.formattedDate(this.model.fechaDeRemision); 

                    this.getDiagnosticoPrincipal(this.model.idDiagnosticoPrincipal);
                    this.getDiagnosticoSecundario(this.model.idDiagnosticoSecundario);                    
                    
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

    getDiagnosticoPrincipal(idDiagnostico: string){
        this.showLoading(true);    
        this.cie10Service.getById(idDiagnostico)
            .subscribe(
                data => {      
                    this.diagnosticoPrincipal = data;                                                      
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

    getDiagnosticoSecundario(idDiagnostico: string){
        this.showLoading(true);    
        this.cie10Service.getById(idDiagnostico)
            .subscribe(
                data => {      
                    this.diagnosticoSecundario = data;                                                      
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
        
        this.model.sede = new Sede();        

        let sede = new Sede();
        sede.idSede = this.idSede;          
        this.model.sede = sede; 

        this.model.atencion = new Atencion();        

        let atencion = new Atencion();
        atencion.idAtencion = this.idAtencion;          
        this.model.atencion = atencion; 

        this.model.cama = new Cama();        

        let cama = new Cama();
        cama.idCama = this.idCama;          
        this.model.cama = cama; 

        this.model.parentesco = new Parentesco();        

        let parentesco = new Parentesco();
        parentesco.idParentesco = this.idParentesco;          
        this.model.parentesco = parentesco;
        
        this.model.idMedico = this.idMedico;
        this.model.idEnfermero = this.idEnfermero;    
        
        this.showLoading(true);               
        this.admisionService.update(this.model)
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
        
        if(this.model.paciente.identificacion == undefined || this.model.paciente.identificacion == ''){
            this.errores.push({ message: 'Ingrese un paciente'});
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

        if(this.idAtencion == undefined || this.idAtencion == ''){
            this.errores.push({ message: 'Seleccione un tipo de atención'});
            areErrors = true;
        }
        
        if(this.idSede == undefined || this.idSede == ''){
            this.errores.push({ message: 'Seleccione una sede'});
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
        
        if(this.diagnosticoPrincipal == undefined || this.diagnosticoPrincipal == null || this.diagnosticoPrincipal == ''){
            this.errores.push({ message: 'Ingrese un diagnostico principal'});
            areErrors = true;
        }

        if(this.diagnosticoSecundario == undefined || this.diagnosticoSecundario == null || this.diagnosticoSecundario == ''){
            this.errores.push({ message: 'Ingrese un diagnostico secundario'});
            areErrors = true;
        }

        if(areErrors){
            this.showErrors();
            return false;
        }

        return true;
    }

    getCamas(idSede: string){
        this.showLoading(true);    
        this.sedeService.getCamasByIdSede(idSede)
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
        this.model = new Admision();
        this.model.paciente = new Paciente();
    }
}