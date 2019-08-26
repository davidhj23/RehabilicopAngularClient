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
import { Toxico } from './toxico';
import { Gesta, GestaService } from '../../listas/gestas';
import {debounceTime, distinctUntilChanged, map, tap, switchMap, catchError} from 'rxjs/operators';
import { of } from '../../../../../node_modules/rxjs/observable/of';
import { Cie10Service } from '../../listas/cie10s';
import { Observable } from '../../../../../node_modules/rxjs';
import { GinecoObstetricio } from './ginecoObstetricio';
import { UserService } from '../../seguridad/usuarios/user.service';
import { AparienciaService, Apariencia } from '../../listas/apariencias';
import { ExamenFisico } from './ExamenFisico';
import { ExamenFisico2 } from './ExamenFisico2';
import { ExamenFisico3 } from './ExamenFisico3';
import { ExamenFisico4 } from './ExamenFisico4';
import { EstadoConciencia, EstadoConcienciaService } from '../../listas/estados-conciencias';
import { Curso, CursoService } from '../../listas/cursos';
import { Asfixia, AsfixiaService } from '../../listas/asfixias';
import { Alucinacion, AlucinacionService } from '../../listas/alucinaciones';
import { Memoria2, Memoria2Service } from '../../listas/memoria2';
import { Inteligencia, InteligenciaService } from '../../listas/inteligencias';
import { Introspeccion, IntrospeccionService } from '../../listas/introspecciones';
import { Alimentacion, AlimentacionService } from '../../listas/alimentaciones';
import { ExamenFisico5 } from './ExamenFisico5';
import { ExamenFisico6 } from './ExamenFisico6';
import { User } from '../../seguridad/usuarios/user';
import { ComprensibleService, Comprensible } from '../../listas/comprensibles';

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
    gestasCombo: any[] = []; 
    medicos: any[] = []; 
    psiquiatras: any[] = []; 
    apariencias: any[] = [];     
    inteligencias: any[] = [];  
    introspecciones: any[] = [];  
    alucinacionesCombo: any[] = []; 
    memoria2Combo: any[] = []; 
    comprensibles: any[] = []; 
    cursos: any[] = []; 
    asfixiasCombo: any[] = []; 
    alimentaciones: any[] = []; 
    estadosConciencias: any[] = []; 

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

    toxicos: Toxico[] = [];
    sustancia = '';
    cantidad = '';
    frecuencia = '';
    edadInicio = '';  

    partos: '';
	abortos: '';
    semanas: '';
    public semanasMask = [/\d/, /\d/, '.', /\d/]
	menarquias: '';
	fum: '';	
	embarazoActual: Opcion;	
    gesta: Gesta;	 
    
    // ExamenFisico 
    examenFisico: ExamenFisico[] = []; 
    apariencia: Apariencia;
    descripcionApariencia: string;    
    signoVitalTa: string;
	signoVitalFc: string;
	signoVitalFr: string;
	signoVitalT: string; 
	midriasis: Opcion;    	
	miosis: Opcion;    
	anisocordia: Opcion;    
    pinral: Opcion;    
	otorragia: Opcion;    
	otoliquia: Opcion;    
	rinoloquia: Opcion;    
	epixtasis: Opcion;    
    murmulloVesicular: Opcion;    
    estertoresCrepitantes: Opcion;    
	roncus: Opcion;    
	sibilancias: Opcion;    
    silencioAuscultorio: Opcion;    
    murmulloVesicularPulmones: Opcion;    
    
    // ExamenFisico2
    frotePericardial: Opcion;    	
	ruidosNoAuscultables: Opcion;    
	arritmico: Opcion;    
	soplo: Opcion;    
	rsCsRsSinSoplo: Opcion; 
	hepatomegalia: Opcion;    
	esplenomegalia: Opcion;    
	masaPalpable: Opcion;    
	signosDeIrritacionPeritoneal: Opcion;    
    sinAlteracionesEvidentes: Opcion;        
    iieoParalitico: Opcion;    
    ascitis: Opcion;   
    
    // ExamenFisico3
    llenadoCapilarAlterado: Opcion;    	
	pulsoAusentes: Opcion;    
	deformidad: Opcion;    
	movilidadAlterada: Opcion;    
	pulsosPerifericosPresentes: Opcion;  
	cianosis: Opcion;    
	ictericia: Opcion;    
	palidezMucocutanea: Opcion;    
	hematomasEquimosisHeridas: Opcion;    
    cicatricesTatuajes: Opcion;        
    sinAlteracionesEvidentes3: Opcion;   

    // ExamenFisico4
    alerta: Opcion;    	
	somnolencia: Opcion;    
	estupor: Opcion;    
	comas: Opcion;    
	agitacion: Opcion;    
	reflejosMuscoloTendinosooAlterados: Opcion;    
	signosmeningeosPresentes: Opcion;    
	perdidaDeLaSensibilidad: Opcion;    
	inconctinenciaUrinariaOFecal: Opcion;    
    movimientosAnormales: Opcion;        
	sinAlteracionesEvidentes4: Opcion;   
	cabezaYCuello: string;	
	cardioPulmar: string;	
	abdomen: string;
	genitourinario: string;	
	extremidades: string;
	descripcionExamenFisico4: string;

    // ExamenFisico5
    estadoConciencia: EstadoConciencia;    	
	fecha: string;    	
	persona: Opcion;    
	espacio: Opcion;    
	tiempo: Opcion;       
	euprosexico: Opcion;    
	hipoprosexico: Opcion;    
	eutimico: Opcion;    
	depresivo: Opcion;    
    expensivo: Opcion;        
	hiperprosexico: Opcion;   
	descripcionExamenFisico5: string;
	orgienNormal: Opcion;    
	acustica: Opcion;    
    concreto: Opcion;        
	pobrezaIdeativa: Opcion;   
	cursoNormal: Opcion;    
	bridipsiquia: Opcion;    
    taquipsiquia: Opcion;        
	fugasDeIdea: Opcion;   
	ideasDelirantes: Opcion;    
	ideasRefenciales: Opcion;    
    ideasObsesivas: Opcion;        
	pensamientoMago: Opcion;   

    // ExamenFisico6
    comprensible: Comprensible;
	disartrias: Opcion;    
	curso: Curso;    
	asfixias: Asfixia;    
	alucinaciones: Alucinacion;    
	tipo: string;
	fijacion: Memoria2;    
    reciente: Memoria2;        
	remota: Memoria2;   
	inteligencia: Inteligencia;    
	introspeccion: Introspeccion;    
	prospeccion: Introspeccion;   
	juicio: Introspeccion;        
	alimentacion: Alimentacion;    
	tipoAlimenticio: string;    
    adecuado: Opcion;        
	hipersomnio: Opcion;   
	insomnio: Opcion;    
	cociliacion: Opcion;    
    reconciliacion: Opcion;        
    global: Opcion; 
    
    medico: User;
    autoriza: User;

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
        private tiempoUsoService: TiempoUsoService,
        private gestaService: GestaService,
        private cie10Service: Cie10Service,
        private aparienciaService: AparienciaService,
        private usuarioService: UserService,
        private inteligenciaService: InteligenciaService,
        private introspeccionService: IntrospeccionService,
        private alucinacionService: AlucinacionService,
        private memoria2Service: Memoria2Service,
        private comprensibleService: ComprensibleService,
        private cursoService: CursoService,
        private asfixiaService: AsfixiaService,
        private alimentacionService: AlimentacionService,
        private estadoConcienciaService: EstadoConcienciaService,
        private pacienteService: PacienteService) {
        
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

        this.showLoading(true);    
        this.gestaService.getAll()
            .subscribe(
                data => {      
                    this.gestasCombo = data;                    
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
        this.usuarioService.getAllPsiquiatras()
            .subscribe(
                data => {      
                    this.psiquiatras = data;                  
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
        this.aparienciaService.getAll()
            .subscribe(
                data => {      
                    this.apariencias = data;                  
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
        this.inteligenciaService.getAll()
            .subscribe(
                data => {      
                    this.inteligencias = data;                  
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
        this.introspeccionService.getAll()
            .subscribe(
                data => {      
                    this.introspecciones = data;                  
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
        this.alucinacionService.getAll()
            .subscribe(
                data => {      
                    this.alucinacionesCombo = data;                  
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
        this.memoria2Service.getAll()
            .subscribe(
                data => {      
                    this.memoria2Combo = data;                  
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
        this.comprensibleService.getAll()
            .subscribe(
                data => {      
                    this.comprensibles = data;                  
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
        this.cursoService.getAll()
            .subscribe(
                data => {      
                    this.cursos = data;                  
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
        this.asfixiaService.getAll()
            .subscribe(
                data => {      
                    this.asfixiasCombo = data;                  
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
        this.alimentacionService.getAll()
            .subscribe(
                data => {      
                    this.alimentaciones = data;                  
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
        this.estadoConcienciaService.getAll()
            .subscribe(
                data => {      
                    this.estadosConciencias = data;                  
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
        this.model.antecedentes = [];
        this.model.antecedentes = this.antecedentes;
        this.model.farmacologicos = [];
        this.model.farmacologicos = this.farmacologicos;
        this.model.toxicos = [];
        this.model.toxicos = this.toxicos;
        this.model.traumaticos = [];
        this.model.traumaticos = this.traumaticos;
        this.model.ginecoObstetricios = [];
        this.addGinecoObstetricio();      
        this.model.examenFisicos = [];        
        this.addExamenFisico();      
        this.model.examenFisicos2 = [];        
        this.addExamenFisico2();
        this.model.examenFisicos3 = [];            
        this.addExamenFisico3();    
        this.model.examenFisicos4 = [];        
        this.addExamenFisico4();  
        this.model.examenFisicos5 = [];        
        this.addExamenFisico5();
        this.model.examenFisicos6 = [];          
        this.addExamenFisico6();  
        
        this.model.idImpresionDiagnostica = this.impresionDiagnostica.idCie10;

        this.model.medico = this.medico;
        this.model.autoriza = this.autoriza;

        this.showLoading(true);    
        this.historiaService.create(this.model)
            .subscribe(
                data => {                        
                    this.clearModel(); 
                    this.clearAdmisionModel();
                    this.clearGinecoObstetricioForm();
                    this.clearExamenFisico();
                    this.clearExamenFisico2();
                    this.clearExamenFisico3();
                    this.clearExamenFisico4();
                    this.clearExamenFisico5();
                    this.clearExamenFisico6();
                    this.impresionDiagnostica = null;
                    this.medico = null;
                    this.autoriza = null;
                                 
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

        if(this.fum != undefined && this.fum != ''){
            if(!Util.validateDate(this.fum)){
                this.errores.push({ message: 'Ingrese un FUM válido'});
                areErrors = true;
            }            
        }

        if(this.impresionDiagnostica == undefined || this.impresionDiagnostica == null){
            this.errores.push({ message: 'Ingrese una impresión diagnostica'});
            areErrors = true;
        }

        if(this.medico == undefined || this.medico == null){
            this.errores.push({ message: 'Seleccione un medico'});
            areErrors = true;
        }

        if(this.autoriza == undefined || this.autoriza == null){
            this.errores.push({ message: 'Seleccione un autorizador'});
            areErrors = true;
        }

        if(areErrors){
            this.showErrors();
            return false;
        }

        return true;
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
        let areErrors = false;
        this.clearAndcloseErrors();              

        if(item == undefined || item == ''){
            this.errores.push({ message: 'Ingrese un paciente'});                        
            this.showErrors();
            return;
        }

        this.model.admision.paciente = item.item;
        this.showLoading(true);    
        this.admisionService.getAdmisionByIdentificacionPaciente(this.model.admision.paciente.identificacion)
            .subscribe(
                data => {      
                    if(data != null){
                        this.model.admision = data;  
                        this.tipoDocumento = this.model.admision.paciente.tipoDocumento.nombre;                                                       
                        this.edad = Util.formattedDate( this.model.admision.paciente.fechaDeNacimiento);                                                       
                        
                        if (this.model.admision.paciente.sexo != null && 
                            this.model.admision.paciente.sexo != undefined)
                            this.sexo = this.model.admision.paciente.sexo.nombre;                                                       
                            
                        this.tipoEntidad = this.model.admision.paciente.tipoEntidad.nombre;                                                       
                        this.aseguradora = this.model.admision.paciente.aseguradora.nombre;                                                       
                    }else{
                        this.errores.push({ message: 'No se encontró un paciente con esa identificación o no tiene una historia activa o no tiene una historia activa'});                        
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

    addToxico(){
        let toxico = new Toxico();
        toxico.sustancia = this.sustancia;
        toxico.cantidad = this.cantidad;       
        toxico.frecuencia = this.frecuencia;    
        toxico.edadInicio = this.edadInicio;        

        this.toxicos.push(toxico);
        this.clearToxicoForm();
    }

    deleteToxico(index: number) {
        this.toxicos.splice(index, 1);
    }

    addGinecoObstetricio(){        
        let ginecoObstetricio = new GinecoObstetricio();
        
        ginecoObstetricio.partos = this.partos;
        ginecoObstetricio.abortos = this.abortos;
        ginecoObstetricio.semanas = this.semanas;
        ginecoObstetricio.menarquias = this.menarquias;

        if(this.fum != undefined && this.fum != ''){
            ginecoObstetricio.fum = Util.getDate(this.fum);        
        }
        
        ginecoObstetricio.embarazoActual = this.embarazoActual;	
        ginecoObstetricio.gesta = this.gesta;

        this.model.ginecoObstetricios.push(ginecoObstetricio);        
    }

    addExamenFisico(){  
        let examenFisico = new ExamenFisico();

        examenFisico.apariencia = this.apariencia;
        examenFisico.descripcionApariencia = this.descripcionApariencia;    
        examenFisico.signoVitalTa = this.signoVitalTa;
        examenFisico.signoVitalFc = this.signoVitalFc;
        examenFisico.signoVitalFr = this.signoVitalFr;
        examenFisico.signoVitalT = this.signoVitalT;  
        examenFisico.midriasis = this.midriasis;    	
        examenFisico.miosis = this.miosis;    
        examenFisico.anisocordia = this.anisocordia;    
        examenFisico.pinral = this.pinral;    
        examenFisico.otorragia = this.otorragia;    
        examenFisico.otoliquia = this.otoliquia;    
        examenFisico.rinoloquia = this.rinoloquia;    
        examenFisico.epixtasis = this.epixtasis;    
        examenFisico.murmulloVesicular = this.murmulloVesicular;    
        examenFisico.estertoresCrepitantes = this.estertoresCrepitantes;    
        examenFisico.roncus = this.roncus;    
        examenFisico.sibilancias = this.sibilancias;    
        examenFisico.silencioAuscultorio = this.silencioAuscultorio;    
        examenFisico.murmulloVesicularPulmones = this.murmulloVesicularPulmones;    

        this.model.examenFisicos.push(examenFisico);  
    }   
    
    addExamenFisico2(){  
        let examenFisico2 = new ExamenFisico2();   
    
        examenFisico2.frotePericardial = this.frotePericardial;
        examenFisico2.ruidosNoAuscultables = this.ruidosNoAuscultables;    
        examenFisico2.arritmico = this.arritmico;
        examenFisico2.soplo = this.soplo;
        examenFisico2.rsCsRsSinSoplo = this.rsCsRsSinSoplo;
        examenFisico2.hepatomegalia = this.hepatomegalia;  
        examenFisico2.esplenomegalia = this.esplenomegalia;    	
        examenFisico2.masaPalpable = this.masaPalpable;    
        examenFisico2.signosDeIrritacionPeritoneal = this.signosDeIrritacionPeritoneal;    
        examenFisico2.sinAlteracionesEvidentes = this.sinAlteracionesEvidentes;    
        examenFisico2.iieoParalitico = this.iieoParalitico;    
        examenFisico2.ascitis = this.ascitis;  

        this.model.examenFisicos2.push(examenFisico2);  
    }

    addExamenFisico3(){  
        let examenFisico3 = new ExamenFisico3();       

        examenFisico3.llenadoCapilarAlterado = this.llenadoCapilarAlterado;
        examenFisico3.pulsoAusentes = this.pulsoAusentes;    
        examenFisico3.deformidad = this.deformidad;
        examenFisico3.movilidadAlterada = this.movilidadAlterada;
        examenFisico3.pulsosPerifericosPresentes = this.pulsosPerifericosPresentes;
        examenFisico3.cianosis = this.cianosis;  
        examenFisico3.ictericia = this.ictericia;    	
        examenFisico3.palidezMucocutanea = this.palidezMucocutanea;    
        examenFisico3.hematomasEquimosisHeridas = this.hematomasEquimosisHeridas;    
        examenFisico3.cicatricesTatuajes = this.cicatricesTatuajes;    
        examenFisico3.sinAlteracionesEvidentes = this.sinAlteracionesEvidentes3;

        this.model.examenFisicos3.push(examenFisico3); 
    }

    addExamenFisico4(){
        let examenFisico4 = new ExamenFisico4();       

        examenFisico4.alerta = this.alerta; 	 
        examenFisico4.somnolencia = this.somnolencia;
        examenFisico4.estupor = this.estupor;    
        examenFisico4.comas = this.comas;    
        examenFisico4.agitacion = this.agitacion;
        examenFisico4.reflejosMuscoloTendinosooAlterados = this.reflejosMuscoloTendinosooAlterados;
        examenFisico4.signosmeningeosPresentes = this.signosmeningeosPresentes;   
        examenFisico4.perdidaDeLaSensibilidad = this.perdidaDeLaSensibilidad;
        examenFisico4.inconctinenciaUrinariaOFecal = this.inconctinenciaUrinariaOFecal;
        examenFisico4.movimientosAnormales = this.movimientosAnormales;        
        examenFisico4.sinAlteracionesEvidentes = this.sinAlteracionesEvidentes4;   
        examenFisico4.cabezaYCuello = this.cabezaYCuello;	
        examenFisico4.cardioPulmar = this.cardioPulmar;	
        examenFisico4.abdomen = this.abdomen;
        examenFisico4.genitourinario = this.genitourinario;	
        examenFisico4.extremidades = this.extremidades;
        examenFisico4.descripcion = this.descripcionExamenFisico4;
    
        this.model.examenFisicos4.push(examenFisico4); 
    }

    addExamenFisico5(){
        let examenFisico5 = new ExamenFisico5();       

        examenFisico5.estadoConciencia = this.estadoConciencia;
        
        if(this.fecha != undefined && this.fecha != ''){
            examenFisico5.fecha = Util.getDate(this.fecha);    	
        }
        
        examenFisico5.persona = this.persona;    
        examenFisico5.espacio = this.espacio;    
        examenFisico5.tiempo = this.tiempo;       
        examenFisico5.euprosexico = this.euprosexico;    
        examenFisico5.hipoprosexico = this.hipoprosexico;    
        examenFisico5.eutimico = this.eutimico;    
        examenFisico5.depresivo = this.depresivo;    
        examenFisico5.expensivo = this.expensivo;        
        examenFisico5.hiperprosexico = this.hiperprosexico;   
        examenFisico5.descripcion = this.descripcionExamenFisico5;
        examenFisico5.orgienNormal = this.orgienNormal;    
        examenFisico5.acustica = this.acustica;    
        examenFisico5.concreto = this.concreto;        
        examenFisico5.pobrezaIdeativa = this.pobrezaIdeativa;   
        examenFisico5.cursoNormal = this.cursoNormal;    
        examenFisico5.bridipsiquia = this.bridipsiquia;    
        examenFisico5.taquipsiquia = this.taquipsiquia;        
        examenFisico5.fugasDeIdea = this.fugasDeIdea;   
        examenFisico5.ideasDelirantes = this.ideasDelirantes;    
        examenFisico5.ideasRefenciales = this.ideasRefenciales;    
        examenFisico5.ideasObsesivas = this.ideasObsesivas;        
        examenFisico5.pensamientoMago = this.pensamientoMago;   
    
        this.model.examenFisicos5.push(examenFisico5);  
    }

    addExamenFisico6(){
        let examenFisico6 = new ExamenFisico6();       

        examenFisico6.comprensible = this.comprensible;
        examenFisico6.disartrias = this.disartrias;
        examenFisico6.curso = this.curso;        
        examenFisico6.asfixias = this.asfixias;
        examenFisico6.alucinaciones = this.alucinaciones;
        examenFisico6.tipo = this.tipo;
        examenFisico6.fijacion = this.fijacion;
        examenFisico6.reciente = this.reciente;
        examenFisico6.remota = this.remota;
        examenFisico6.inteligencia = this.inteligencia;
        examenFisico6.introspeccion = this.introspeccion;
        examenFisico6.prospeccion = this.prospeccion;
        examenFisico6.juicio = this.juicio;
        examenFisico6.alimentacion = this.alimentacion;
        examenFisico6.tipoAlimenticio = this.tipoAlimenticio;
        examenFisico6.adecuado = this.adecuado;
        examenFisico6.hipersomnio = this.hipersomnio
        examenFisico6.insomnio = this.insomnio;
        examenFisico6.cociliacion = this.cociliacion;
        examenFisico6.reconciliacion = this.reconciliacion;
        examenFisico6.global = this.global;

        this.model.examenFisicos6.push(examenFisico6); 
    }

    impresionDiagnostica: any;

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
        this.toxicos = [];
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

    clearToxicoForm(){        
        this.sustancia = '';
        this.cantidad = '';
        this.frecuencia = '';
        this.edadInicio = '';            
    }

    clearGinecoObstetricioForm(){        
        this.partos = '';
        this.abortos = '';
        this.semanas = '';
        this.menarquias = '';
        this.fum = '';	        
        this.embarazoActual = new Opcion();	
        this.gesta = new Gesta();	          
    }

    clearExamenFisico(){    
        this.apariencia = new Apariencia();
        this.descripcionApariencia = "";    
        this.signoVitalTa = "";
        this.signoVitalFc = "";	
        this.signoVitalFr = "";	
        this.signoVitalT = "";	  
        this.midriasis = new Opcion();	    	
        this.miosis = new Opcion();	    
        this.anisocordia = new Opcion();	    
        this.pinral = new Opcion();	    
        this.otorragia = new Opcion();	    
        this.otoliquia = new Opcion();	    
        this.rinoloquia = new Opcion();	    
        this.epixtasis = new Opcion();	    
        this.murmulloVesicular = new Opcion();	    
        this.estertoresCrepitantes = new Opcion();	    
        this.roncus = new Opcion();	    
        this.sibilancias = new Opcion();	    
        this.silencioAuscultorio = new Opcion();	    
        this.murmulloVesicularPulmones = new Opcion();	    
    }

    clearExamenFisico2(){    
        this.frotePericardial = new Opcion();
        this.ruidosNoAuscultables = new Opcion();    
        this.arritmico = new Opcion();
        this.soplo = new Opcion();
        this.rsCsRsSinSoplo = new Opcion();
        this.hepatomegalia = new Opcion();  
        this.esplenomegalia = new Opcion();    	
        this.masaPalpable = new Opcion();    
        this.signosDeIrritacionPeritoneal = new Opcion();    
        this.sinAlteracionesEvidentes = new Opcion();    
        this.iieoParalitico = new Opcion();    
        this.ascitis = new Opcion();  
    }

    clearExamenFisico3(){ 
        this.llenadoCapilarAlterado = new Opcion();
        this.pulsoAusentes = new Opcion();     
        this.deformidad = new Opcion();
        this.movilidadAlterada = new Opcion();
        this.pulsosPerifericosPresentes = new Opcion();
        this.cianosis = new Opcion();  
        this.ictericia = new Opcion();    	
        this.palidezMucocutanea = new Opcion();    
        this.hematomasEquimosisHeridas = new Opcion();    
        this.cicatricesTatuajes = new Opcion();    
        this.sinAlteracionesEvidentes3 = new Opcion();
    }

    clearExamenFisico4(){ 
        this.alerta = new Opcion(); 	 
        this.somnolencia = new Opcion();
        this.estupor = new Opcion();    
        this.comas = new Opcion();    
        this.agitacion = new Opcion();
        this.reflejosMuscoloTendinosooAlterados = new Opcion();
        this.signosmeningeosPresentes = new Opcion();   
        this.perdidaDeLaSensibilidad = new Opcion();
        this.inconctinenciaUrinariaOFecal = new Opcion();
        this.movimientosAnormales = new Opcion();        
        this.sinAlteracionesEvidentes4 = new Opcion();   
        this.cabezaYCuello = "";	
        this.cardioPulmar = "";	
        this.abdomen = "";
        this.genitourinario = "";	
        this.extremidades = "";
        this.descripcionExamenFisico4 = "";
    }

    clearExamenFisico5(){ 
        this.estadoConciencia = new EstadoConciencia();    	
        this.fecha = '';    	
        this.persona = new Opcion();    
        this.espacio = new Opcion();    
        this.tiempo = new Opcion();       
        this.euprosexico = new Opcion();    
        this.hipoprosexico = new Opcion();    
        this.eutimico = new Opcion();    
        this.depresivo = new Opcion();    
        this.expensivo = new Opcion();        
        this.hiperprosexico = new Opcion();   
        this.descripcionExamenFisico5 = "";
        this.orgienNormal = new Opcion();    
        this.acustica = new Opcion();    
        this.concreto = new Opcion();        
        this.pobrezaIdeativa = new Opcion();   
        this.cursoNormal = new Opcion();    
        this.bridipsiquia = new Opcion();    
        this.taquipsiquia = new Opcion();        
        this.fugasDeIdea = new Opcion();   
        this.ideasDelirantes = new Opcion();    
        this.ideasRefenciales = new Opcion();    
        this.ideasObsesivas = new Opcion();        
        this.pensamientoMago = new Opcion();  
    }

    clearExamenFisico6(){ 
        this.comprensible = new Comprensible();
        this.disartrias = new Opcion();
        this.curso = new Curso();        
        this.asfixias = new Asfixia();
        this.alucinaciones = new Alucinacion;
        this.tipo = '';
        this.fijacion = new Memoria2;
        this.reciente = new Memoria2;
        this.remota = new Memoria2;
        this.inteligencia = new Inteligencia();
        this.introspeccion = new Introspeccion();
        this.prospeccion = new Introspeccion();
        this.juicio = new Introspeccion();
        this.alimentacion = new Alimentacion();
        this.tipoAlimenticio = '';
        this.adecuado = new Opcion();
        this.hipersomnio = new Opcion();
        this.insomnio = new Opcion();
        this.cociliacion = new Opcion();
        this.reconciliacion = new Opcion();
        this.global = new Opcion();
    }
}