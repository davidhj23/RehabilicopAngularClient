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
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'editarHistorias',
    templateUrl: 'editarHistorias.component.html',
})

export class EditarHistoriasComponent implements OnInit {       
    
    currentHistoriaId: string;

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
	fum: string;	
	embarazoActual = new Opcion();	
    gesta = new Gesta();	 
    
    // ExamenFisico 
    examenFisico: ExamenFisico[] = []; 
    apariencia = new Apariencia();
    descripcionApariencia: string;    
    signoVitalTa: string;
	signoVitalFc: string;
	signoVitalFr: string;
	signoVitalT: string; 
	midriasis = new Opcion(); 
	miosis = new Opcion(); 
	anisocordia = new Opcion(); 
    pinral = new Opcion(); 
	otorragia = new Opcion(); 
	otoliquia = new Opcion(); 
	rinoloquia = new Opcion(); 
	epixtasis = new Opcion(); 
    murmulloVesicular = new Opcion(); 
    estertoresCrepitantes = new Opcion(); 
	roncus = new Opcion(); 
	sibilancias = new Opcion(); 
    silencioAuscultorio = new Opcion(); 
    murmulloVesicularPulmones = new Opcion(); 
    
    // ExamenFisico2
    frotePericardial = new Opcion();       	
	ruidosNoAuscultables = new Opcion();     
	arritmico = new Opcion();   
	soplo = new Opcion();    
	rsCsRsSinSoplo = new Opcion();    
	hepatomegalia = new Opcion();       
	esplenomegalia = new Opcion();     
	masaPalpable = new Opcion();   
	signosDeIrritacionPeritoneal = new Opcion();   
    sinAlteracionesEvidentes = new Opcion();      
    iieoParalitico = new Opcion();   
    ascitis = new Opcion();   
    
    // ExamenFisico3
    llenadoCapilarAlterado = new Opcion();    	
	pulsoAusentes = new Opcion();    
	deformidad = new Opcion();    
	movilidadAlterada = new Opcion();    
	pulsosPerifericosPresentes = new Opcion();  
	cianosis = new Opcion();    
	ictericia = new Opcion();    
	palidezMucocutanea = new Opcion();    
	hematomasEquimosisHeridas = new Opcion();    
    cicatricesTatuajes = new Opcion();        
    sinAlteracionesEvidentes3 = new Opcion();   

    // ExamenFisico4
    alerta = new Opcion();   
	somnolencia = new Opcion();   
	estupor = new Opcion();   
	comas = new Opcion();       
	agitacion = new Opcion();   
	reflejosMuscoloTendinosooAlterados = new Opcion();   
	signosmeningeosPresentes = new Opcion();   
	perdidaDeLaSensibilidad = new Opcion();    
	inconctinenciaUrinariaOFecal = new Opcion();       
    movimientosAnormales = new Opcion();         
	sinAlteracionesEvidentes4 = new Opcion();   
	cabezaYCuello: string;	
	cardioPulmar: string;	
	abdomen: string;
	genitourinario: string;	
	extremidades: string;
	descripcionExamenFisico4: string;

    // ExamenFisico5
    estadoConciencia = new EstadoConciencia();    	
    fecha = '';    	
    persona = new Opcion();    
    espacio = new Opcion();    
    tiempo = new Opcion();       
    euprosexico = new Opcion();    
    hipoprosexico = new Opcion();    
    eutimico = new Opcion();    
    depresivo = new Opcion();    
    expensivo = new Opcion();        
    hiperprosexico = new Opcion();   
    descripcionExamenFisico5 = "";
    orgienNormal = new Opcion();    
    acustica = new Opcion();    
    concreto = new Opcion();        
    pobrezaIdeativa = new Opcion();   
    cursoNormal = new Opcion();    
    bridipsiquia = new Opcion();    
    taquipsiquia = new Opcion();        
    fugasDeIdea = new Opcion();   
    ideasDelirantes = new Opcion();    
    ideasRefenciales = new Opcion();    
    ideasObsesivas = new Opcion();        
    pensamientoMago = new Opcion();  

    // ExamenFisico6
    comprensible = new Comprensible();
    disartrias = new Opcion();
    curso = new Curso();        
    asfixias = new Asfixia();
    alucinaciones = new Alucinacion;
    tipo = '';
    fijacion = new Memoria2;
    reciente = new Memoria2;
    remota = new Memoria2;
    inteligencia = new Inteligencia();
    introspeccion = new Introspeccion();
    prospeccion = new Introspeccion();
    juicio = new Introspeccion();
    alimentacion = new Alimentacion();
    tipoAlimenticio = '';
    adecuado = new Opcion();
    hipersomnio = new Opcion();
    insomnio = new Opcion();
    cociliacion = new Opcion();
    reconciliacion = new Opcion();
    global = new Opcion();
    
    medico = new User();
    autoriza = new User();

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
        private route: ActivatedRoute) {
        
        this.model = new Historia();
        this.model.admision = new Admision();
        this.model.admision.paciente = new Paciente();  
        
        this.route.params.subscribe( 
            params => {
                this.currentHistoriaId = params['id'];
            }
        );
    }

    ngOnInit() {    
        this.fillSelects();

        this.showLoading(true);    
        this.historiaService.getById(this.currentHistoriaId)
            .subscribe(
                data => {                                                 
                    this.model = data;         

                    this.model.admision = data.admision;  
                    this.tipoDocumento = this.model.admision.paciente.tipoDocumento.nombre;                                                       
                    this.edad = Util.calculateAge(this.model.admision.paciente.fechaDeNacimiento).toString();                                                       
                    this.sexo = this.model.admision.paciente.sexo.nombre;                                                       
                    this.tipoEntidad = this.model.admision.paciente.tipoEntidad.nombre;                                                       
                    this.aseguradora = this.model.admision.paciente.aseguradora.nombre;                                                                           

                    this.showLoading(false);       
                    this.getImpresionDiagnostica(this.model.idImpresionDiagnostica);                    
                    this.medico = this.model.medico;
                    this.autoriza = this.model.autoriza;

                    this.showLoading(true);    
                    this.historiaService.getPatologicosByIdHistoria(this.currentHistoriaId)
                        .subscribe(
                            data => {                                               
                                this.patologicos = data;  
                                this.showLoading(false);             
                        })

                    this.showLoading(true);    
                    this.historiaService.getAntecedentesByIdHistoria(this.currentHistoriaId)
                        .subscribe(
                            data => {                                                                               
                                this.antecedentes = data; 
                                this.showLoading(false);              
                        })

                    this.showLoading(true);    
                    this.historiaService.getTraumaticosByIdHistoria(this.currentHistoriaId)
                        .subscribe(
                            data => {                                               
                                this.traumaticos = data;  
                                this.showLoading(false);             
                        })

                    this.showLoading(true);    
                    this.historiaService.getFarmacologicosByIdHistoria(this.currentHistoriaId)
                        .subscribe(
                            data => {                                               
                                this.farmacologicos = data;  
                                this.showLoading(false);             
                        })

                    this.showLoading(true);    
                    this.historiaService.getToxicosByIdHistoria(this.currentHistoriaId)
                        .subscribe(
                            data => {                                               
                                this.toxicos = data;   
                                this.showLoading(false);            
                        })

                    this.showLoading(true);    
                    this.historiaService.getGinecoObstetriciosByIdHistoria(this.currentHistoriaId)
                        .subscribe(
                            data => {                                
                                this.partos = data[0].partos;                                
                                this.abortos = data[0].abortos;
                                this.semanas = data[0].semanas;
                                this.menarquias = data[0].menarquias;
                                
                                if(data[0].fum != undefined && data[0].fum != '')
                                    this.fum = Util.formattedDate(data[0].fum);        
                                                                
                                this.embarazoActual = data[0].embarazoActual;	                                
                                this.gesta = data[0].gesta;
                                this.showLoading(false);            
                        })

                    this.showLoading(true);    
                    this.historiaService.getExamenFisicoByIdHistoria(this.currentHistoriaId)
                        .subscribe(
                            data => {  
                                this.apariencia = data[0].apariencia;                                                              
                                this.descripcionApariencia = data[0].descripcionApariencia;        
                                this.signoVitalTa = data[0].signoVitalTa;
                                this.signoVitalFc = data[0].signoVitalFr;                      
                                this.signoVitalFr = data[0].signoVitalFr;
                                this.signoVitalT = data[0].signoVitalT;

                                this.midriasis = data[0].midriasis;        
                                this.miosis = data[0].miosis;	    
                                this.anisocordia = data[0].anisocordia;	    
                                this.pinral = data[0].pinral;	    
                                this.otorragia = data[0].otorragia;	    
                                this.otoliquia = data[0].otoliquia;	    
                                this.rinoloquia = data[0].rinoloquia;	    
                                this.epixtasis = data[0].epixtasis;	                                    
                                this.murmulloVesicular = data[0].murmulloVesicular;	    
                                this.estertoresCrepitantes = data[0].estertoresCrepitantes;	    
                                this.roncus = data[0].roncus;	    
                                this.sibilancias = data[0].sibilancias;	    
                                this.silencioAuscultorio = data[0].silencioAuscultorio;	    
                                this.murmulloVesicularPulmones = data[0].murmulloVesicularPulmones;
                                this.showLoading(false);            
                        })

                    this.showLoading(true);    
                    this.historiaService.getExamenFisico2ByIdHistoria(this.currentHistoriaId)
                        .subscribe(
                            data => { 
                                this.frotePericardial = data[0].frotePericardial;
                                this.ruidosNoAuscultables = data[0].ruidosNoAuscultables;    
                                this.arritmico = data[0].arritmico;
                                this.soplo = data[0].soplo;
                                this.rsCsRsSinSoplo = data[0].rsCsRsSinSoplo;
                                this.hepatomegalia = data[0].hepatomegalia;  
                                this.esplenomegalia = data[0].esplenomegalia;    	
                                this.masaPalpable = data[0].masaPalpable;    
                                this.signosDeIrritacionPeritoneal = data[0].signosDeIrritacionPeritoneal;    
                                this.sinAlteracionesEvidentes = data[0].sinAlteracionesEvidentes;    
                                this.iieoParalitico = data[0].iieoParalitico;    
                                this.ascitis = data[0].ascitis;   
                                this.showLoading(false);            
                            })
                    
                    this.showLoading(true);    
                    this.historiaService.getExamenFisico3ByIdHistoria(this.currentHistoriaId)
                        .subscribe(
                            data => { 
                                this.llenadoCapilarAlterado = data[0].llenadoCapilarAlterado;
                                this.pulsoAusentes = data[0].pulsoAusentes;     
                                this.deformidad = data[0].deformidad;
                                this.movilidadAlterada = data[0].movilidadAlterada;
                                this.pulsosPerifericosPresentes = data[0].pulsosPerifericosPresentes;
                                this.cianosis = data[0].cianosis;  
                                this.ictericia = data[0].ictericia;    	
                                this.palidezMucocutanea = data[0].palidezMucocutanea;    
                                this.hematomasEquimosisHeridas = data[0].hematomasEquimosisHeridas;    
                                this.cicatricesTatuajes = data[0].cicatricesTatuajes;    
                                this.sinAlteracionesEvidentes3 = data[0].sinAlteracionesEvidentes;
                                this.showLoading(false);            
                            })

                    this.showLoading(true);    
                    this.historiaService.getExamenFisico4ByIdHistoria(this.currentHistoriaId)
                        .subscribe(
                            data => { 
                                this.alerta = data[0].alerta; 	 
                                this.somnolencia = data[0].somnolencia;
                                this.estupor = data[0].estupor;    
                                this.comas = data[0].comas;    
                                this.agitacion = data[0].agitacion;
                                this.reflejosMuscoloTendinosooAlterados = data[0].reflejosMuscoloTendinosooAlterados;
                                this.signosmeningeosPresentes = data[0].signosmeningeosPresentes;   
                                this.perdidaDeLaSensibilidad = data[0].perdidaDeLaSensibilidad;
                                this.inconctinenciaUrinariaOFecal = data[0].inconctinenciaUrinariaOFecal;
                                this.movimientosAnormales = data[0].movimientosAnormales;        
                                this.sinAlteracionesEvidentes4 = data[0].sinAlteracionesEvidentes; 

                                this.cabezaYCuello = data[0].cabezaYCuello;	
                                this.cardioPulmar = data[0].cardioPulmar;	
                                this.abdomen = data[0].abdomen;
                                this.genitourinario = data[0].genitourinario;	
                                this.extremidades = data[0].extremidades;

                                this.descripcionExamenFisico4 = data[0].descripcion;
                                this.showLoading(false);            
                            })

                    this.showLoading(true);    
                    this.historiaService.getExamenFisico5ByIdHistoria(this.currentHistoriaId)
                        .subscribe(
                            data => { 
                                this.estadoConciencia = data[0].estadoConciencia;    
                                
                                if(data[0].fecha != undefined && data[0].fecha != '')
                                    this.fecha = Util.formattedDate(data[0].fecha);  
                                
                                this.persona = data[0].persona;    
                                this.espacio = data[0].espacio;    
                                this.tiempo = data[0].tiempo;       
                                this.euprosexico = data[0].euprosexico;    
                                this.hipoprosexico = data[0].hipoprosexico;    
                                this.eutimico = data[0].eutimico;    
                                this.depresivo = data[0].depresivo;    
                                this.expensivo = data[0].expensivo;        
                                this.hiperprosexico = data[0].hiperprosexico;   
                                this.descripcionExamenFisico5 = data[0].descripcion;
                                this.orgienNormal = data[0].orgienNormal;    
                                this.acustica = data[0].acustica;    
                                this.concreto = data[0].concreto;        
                                this.pobrezaIdeativa = data[0].pobrezaIdeativa;   
                                this.cursoNormal = data[0].cursoNormal;    
                                this.bridipsiquia = data[0].bridipsiquia;    
                                this.taquipsiquia = data[0].taquipsiquia;        
                                this.fugasDeIdea = data[0].fugasDeIdea;   
                                this.ideasDelirantes = data[0].ideasDelirantes;    
                                this.ideasRefenciales = data[0].ideasRefenciales;    
                                this.ideasObsesivas = data[0].ideasObsesivas;        
                                this.pensamientoMago = data[0].pensamientoMago; 
                                this.showLoading(false);            
                            })

                    this.showLoading(true);            
                    this.historiaService.getExamenFisico6ByIdHistoria(this.currentHistoriaId)
                        .subscribe(
                            data => {                                 
                                this.comprensible = data[0].comprensible;
                                this.disartrias = data[0].disartrias;
                                this.curso = data[0].curso;        
                                this.asfixias = data[0].asfixias;
                                this.alucinaciones = data[0].alucinaciones;
                                this.tipo = data[0].tipo;
                                this.fijacion = data[0].fijacion;
                                this.reciente = data[0].reciente;
                                this.remota = data[0].remota;
                                this.inteligencia = data[0].inteligencia;
                                this.introspeccion = data[0].introspeccion;
                                this.prospeccion = data[0].prospeccion;
                                this.juicio = data[0].juicio;
                                this.alimentacion = data[0].alimentacion;
                                this.tipoAlimenticio = data[0].tipoAlimenticio;
                                this.adecuado = data[0].adecuado;
                                this.hipersomnio = data[0].hipersomnio;
                                this.insomnio = data[0].insomnio;
                                this.cociliacion = data[0].cociliacion;
                                this.reconciliacion = data[0].reconciliacion;
                                this.global = data[0].global;
                                this.showLoading(false);            
                        })          
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
    
    getImpresionDiagnostica(idDiagnostico: String){
        this.showLoading(true);    
        this.cie10Service.getById(idDiagnostico)
            .subscribe(
                data => {      
                    this.impresionDiagnostica = data;                                                      
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
        this.historiaService.update(this.model)
            .subscribe(
                data => {                        
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

        this.model.ginecoObstetricios = [];
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