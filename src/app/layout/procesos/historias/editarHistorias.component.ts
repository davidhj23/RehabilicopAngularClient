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
    causa: string;

    traumaticos: Traumatico[] = []; 
    trauma: string;
	tiempoEvolucionTraumatico: string;	
    secuelas: string;
	compromisoConciencia: Opcion;

    farmacologicos: Farmacologico[] = []; 
    medicamento: string;
    dosis: string;       
	eficacia: Opcion;    
	eventoAdverso: string;
    tiempoDeUso: string;

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
    
    historiaActiva = true;
    
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
                    
                    if(data.admision.estado == 'CERRADA')
                    {
                        let errores = [];
                        errores.push({ message: 'Esta historia ya está cerrada'});
                        this.errores = errores;
                        this.historiaActiva = false;
                        this.showErrors();
                        return;
                    }

                    this.model = data;         

                    this.model.admision = data.admision;  
                    this.tipoDocumento = this.model.admision.paciente.tipoDocumento.nombre;                                                       
                    this.edad = Util.calculateAge(this.model.admision.paciente.fechaDeNacimiento).toString();                                                       
                    
                    if (this.model.admision.paciente.sexo != null && 
                        this.model.admision.paciente.sexo != undefined)
                        this.sexo = this.model.admision.paciente.sexo.nombre;  

                    this.tipoEntidad = this.model.admision.paciente.tipoEntidad.nombre;                                                       
                    this.aseguradora = this.model.admision.paciente.aseguradora.nombre;                                                                           

                    this.showLoading(false);       
                    this.getImpresionDiagnostica(this.model.idImpresionDiagnostica);                    
                    this.getImpresionDiagnostica2(this.model.idImpresionDiagnostica2);                    
                    this.getImpresionDiagnostica3(this.model.idImpresionDiagnostica3);                    
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
                                if(data[0] != undefined && data[0] != null) {
                                    this.partos = data[0].partos;                                
                                    this.abortos = data[0].abortos;
                                    this.semanas = data[0].semanas;
                                    this.menarquias = data[0].menarquias;
                                    
                                    if(data[0].fum != undefined && data[0].fum != '')
                                        this.fum = Util.formattedDate(data[0].fum);        
                                                                    
                                    this.embarazoActual = (data[0].embarazoActual == null) ? new Opcion() : data[0].embarazoActual;
                                    this.gesta = (data[0].gesta == null) ? new Gesta() : data[0].gesta;                                
                                }

                                this.showLoading(false);            
                        })

                    this.showLoading(true);    
                    this.historiaService.getExamenFisicoByIdHistoria(this.currentHistoriaId)
                        .subscribe(
                            data => {  
                                if(data[0] != undefined && data[0] != null) {
                                    this.apariencia = (data[0].apariencia == null) ? new Apariencia() : data[0].apariencia;                                                              
                                    this.descripcionApariencia = data[0].descripcionApariencia;        
                                    this.signoVitalTa = data[0].signoVitalTa;
                                    this.signoVitalFc = data[0].signoVitalFr;                      
                                    this.signoVitalFr = data[0].signoVitalFr;
                                    this.signoVitalT = data[0].signoVitalT;

                                    this.midriasis = (data[0].midriasis == null) ? new Opcion() : data[0].midriasis;
                                    this.miosis = (data[0].miosis == null) ? new Opcion() : data[0].miosis;
                                    this.anisocordia = (data[0].anisocordia == null) ? new Opcion() : data[0].anisocordia;
                                    this.pinral = (data[0].pinral == null) ? new Opcion() : data[0].pinral;
                                    this.otorragia = (data[0].otorragia == null) ? new Opcion() : data[0].otorragia;	    
                                    this.otoliquia = (data[0].otoliquia == null) ? new Opcion() : data[0].otoliquia;	    
                                    this.rinoloquia = (data[0].rinoloquia == null) ? new Opcion() : data[0].rinoloquia;
                                    this.epixtasis = (data[0].epixtasis == null) ? new Opcion() : data[0].epixtasis;	                                    
                                    this.murmulloVesicular = (data[0].murmulloVesicular == null) ? new Opcion() : data[0].murmulloVesicular;	    
                                    this.estertoresCrepitantes = (data[0].estertoresCrepitantes == null) ? new Opcion() : data[0].estertoresCrepitantes;
                                    this.roncus = (data[0].roncus == null) ? new Opcion() : data[0].roncus;	    
                                    this.sibilancias = (data[0].sibilancias == null) ? new Opcion() : data[0].sibilancias;	    
                                    this.silencioAuscultorio = (data[0].silencioAuscultorio == null) ? new Opcion() : data[0].silencioAuscultorio;	    
                                    this.murmulloVesicularPulmones = (data[0].murmulloVesicularPulmones == null) ? new Opcion() : data[0].murmulloVesicularPulmones;
                                }

                                this.showLoading(false);            
                        })

                    this.showLoading(true);    
                    this.historiaService.getExamenFisico2ByIdHistoria(this.currentHistoriaId)
                        .subscribe(
                            data => { 
                                if(data[0] != undefined && data[0] != null) {
                                    this.frotePericardial = (data[0].frotePericardial == null) ? new Opcion() : data[0].frotePericardial;
                                    this.ruidosNoAuscultables = (data[0].ruidosNoAuscultables == null) ? new Opcion() : data[0].ruidosNoAuscultables;
                                    this.arritmico = (data[0].arritmico == null) ? new Opcion() : data[0].arritmico;
                                    this.soplo = (data[0].soplo == null) ? new Opcion() : data[0].soplo;
                                    this.rsCsRsSinSoplo = (data[0].rsCsRsSinSoplo == null) ? new Opcion() : data[0].rsCsRsSinSoplo;
                                    this.hepatomegalia = (data[0].hepatomegalia == null) ? new Opcion() : data[0].hepatomegalia;
                                    this.esplenomegalia = (data[0].esplenomegalia == null) ? new Opcion() : data[0].esplenomegalia;
                                    this.masaPalpable = (data[0].masaPalpable == null) ? new Opcion() : data[0].masaPalpable;
                                    this.signosDeIrritacionPeritoneal = (data[0].signosDeIrritacionPeritoneal == null) ? new Opcion() : data[0].signosDeIrritacionPeritoneal;
                                    this.sinAlteracionesEvidentes = (data[0].sinAlteracionesEvidentes == null) ? new Opcion() : data[0].sinAlteracionesEvidentes;
                                    this.iieoParalitico = (data[0].iieoParalitico == null) ? new Opcion() : data[0].iieoParalitico;
                                    this.ascitis = (data[0].ascitis == null) ? new Opcion() : data[0].ascitis;
                                }

                                this.showLoading(false);            
                            })
                    
                    this.showLoading(true);    
                    this.historiaService.getExamenFisico3ByIdHistoria(this.currentHistoriaId)
                        .subscribe(
                            data => { 
                                if(data[0] != undefined && data[0] != null) {
                                    this.llenadoCapilarAlterado = (data[0].llenadoCapilarAlterado == null) ? new Opcion() : data[0].llenadoCapilarAlterado;
                                    this.pulsoAusentes = (data[0].pulsoAusentes == null) ? new Opcion() : data[0].pulsoAusentes;
                                    this.deformidad = (data[0].deformidad == null) ? new Opcion() : data[0].deformidad;
                                    this.movilidadAlterada = (data[0].movilidadAlterada == null) ? new Opcion() : data[0].movilidadAlterada;
                                    this.pulsosPerifericosPresentes = (data[0].pulsosPerifericosPresentes == null) ? new Opcion() : data[0].pulsosPerifericosPresentes;
                                    this.cianosis = (data[0].cianosis == null) ? new Opcion() : data[0].cianosis;
                                    this.ictericia = (data[0].ictericia == null) ? new Opcion() : data[0].ictericia;
                                    this.palidezMucocutanea = (data[0].palidezMucocutanea == null) ? new Opcion() : data[0].palidezMucocutanea;
                                    this.hematomasEquimosisHeridas = (data[0].hematomasEquimosisHeridas == null) ? new Opcion() : data[0].hematomasEquimosisHeridas;
                                    this.cicatricesTatuajes = (data[0].cicatricesTatuajes == null) ? new Opcion() : data[0].cicatricesTatuajes;
                                    this.sinAlteracionesEvidentes3 = (data[0].sinAlteracionesEvidentes3 == null) ? new Opcion() : data[0].sinAlteracionesEvidentes3;
                                }

                                this.showLoading(false);            
                            })

                    this.showLoading(true);    
                    this.historiaService.getExamenFisico4ByIdHistoria(this.currentHistoriaId)
                        .subscribe(
                            data => { 
                                if(data[0] != undefined && data[0] != null) {
                                    this.alerta = (data[0].alerta == null) ? new Opcion() : data[0].alerta;
                                    this.somnolencia = (data[0].somnolencia == null) ? new Opcion() : data[0].somnolencia;
                                    this.estupor = (data[0].estupor == null) ? new Opcion() : data[0].estupor;
                                    this.comas = (data[0].comas == null) ? new Opcion() : data[0].comas;
                                    this.agitacion = (data[0].agitacion == null) ? new Opcion() : data[0].agitacion;
                                    this.reflejosMuscoloTendinosooAlterados = (data[0].reflejosMuscoloTendinosooAlterados == null) ? new Opcion() : data[0].reflejosMuscoloTendinosooAlterados;
                                    this.signosmeningeosPresentes = (data[0].signosmeningeosPresentes == null) ? new Opcion() : data[0].signosmeningeosPresentes;
                                    this.perdidaDeLaSensibilidad = (data[0].perdidaDeLaSensibilidad == null) ? new Opcion() : data[0].perdidaDeLaSensibilidad;
                                    this.inconctinenciaUrinariaOFecal = (data[0].inconctinenciaUrinariaOFecal == null) ? new Opcion() : data[0].inconctinenciaUrinariaOFecal;
                                    this.movimientosAnormales = (data[0].movimientosAnormales == null) ? new Opcion() : data[0].movimientosAnormales;
                                    this.sinAlteracionesEvidentes4 = (data[0].sinAlteracionesEvidentes4 == null) ? new Opcion() : data[0].sinAlteracionesEvidentes4;

                                    this.cabezaYCuello = data[0].cabezaYCuello;	
                                    this.cardioPulmar = data[0].cardioPulmar;	
                                    this.abdomen = data[0].abdomen;
                                    this.genitourinario = data[0].genitourinario;	
                                    this.extremidades = data[0].extremidades;

                                    this.descripcionExamenFisico4 = data[0].descripcion;
                                }

                                this.showLoading(false);            
                            })

                    this.showLoading(true);    
                    this.historiaService.getExamenFisico5ByIdHistoria(this.currentHistoriaId)
                        .subscribe(
                            data => { 
                                if(data[0] != undefined && data[0] != null) {
                                    this.estadoConciencia = (data[0].estadoConciencia == null) ? new EstadoConciencia(): data[0].estadoConciencia;    
                                    
                                    if(data[0].fecha != undefined && data[0].fecha != '')
                                        this.fecha = Util.formattedDate(data[0].fecha);  
                                    
                                    this.persona = (data[0].persona == null) ? new Opcion() : data[0].persona;
                                    this.espacio = (data[0].espacio == null) ? new Opcion() : data[0].espacio;
                                    this.tiempo = (data[0].tiempo == null) ? new Opcion() : data[0].tiempo;
                                    this.euprosexico = (data[0].euprosexico == null) ? new Opcion() : data[0].euprosexico;    
                                    this.hipoprosexico = (data[0].hipoprosexico == null) ? new Opcion() : data[0].hipoprosexico;    
                                    this.eutimico = (data[0].eutimico == null) ? new Opcion() : data[0].eutimico;    
                                    this.depresivo = (data[0].depresivo == null) ? new Opcion() : data[0].depresivo;    
                                    this.expensivo = (data[0].expensivo == null) ? new Opcion() : data[0].expensivo;        
                                    this.hiperprosexico = (data[0].hiperprosexico == null) ? new Opcion() : data[0].hiperprosexico;   

                                    this.descripcionExamenFisico5 = data[0].descripcion;

                                    this.orgienNormal = (data[0].orgienNormal == null) ? new Opcion() : data[0].orgienNormal;    
                                    this.acustica = (data[0].acustica == null) ? new Opcion() : data[0].acustica;    
                                    this.concreto = (data[0].concreto == null) ? new Opcion() : data[0].concreto;        
                                    this.pobrezaIdeativa = (data[0].pobrezaIdeativa == null) ? new Opcion() : data[0].pobrezaIdeativa;   
                                    this.cursoNormal = (data[0].cursoNormal == null) ? new Opcion() : data[0].cursoNormal;    
                                    this.bridipsiquia = (data[0].bridipsiquia == null) ? new Opcion() : data[0].bridipsiquia;   
                                    this.taquipsiquia = (data[0].taquipsiquia == null) ? new Opcion() : data[0].taquipsiquia;        
                                    this.fugasDeIdea = (data[0].fugasDeIdea == null) ? new Opcion() : data[0].fugasDeIdea;   
                                    this.ideasDelirantes = (data[0].ideasDelirantes == null) ? new Opcion() : data[0].ideasDelirantes;    
                                    this.ideasRefenciales = (data[0].ideasRefenciales == null) ? new Opcion() : data[0].ideasRefenciales;    
                                    this.ideasObsesivas = (data[0].ideasObsesivas == null) ? new Opcion() : data[0].ideasObsesivas;        
                                    this.pensamientoMago = (data[0].pensamientoMago == null) ? new Opcion() : data[0].pensamientoMago; 
                                }

                                this.showLoading(false);            
                            })

                    this.showLoading(true);            
                    this.historiaService.getExamenFisico6ByIdHistoria(this.currentHistoriaId)
                        .subscribe(
                            data => {  
                                if(data[0] != undefined && data[0] != null) {                               
                                    this.comprensible = (data[0].comprensible == null) ? new Comprensible() : data[0].comprensible; 
                                    this.disartrias = (data[0].disartrias == null) ? new Opcion() : data[0].disartrias; 
                                    this.curso = (data[0].curso == null) ? new Curso() : data[0].curso; 
                                    this.asfixias = (data[0].asfixias == null) ? new Asfixia() : data[0].asfixias; 

                                    this.alucinaciones = (data[0].alucinaciones == null) ? new Alucinacion() : data[0].alucinaciones; 

                                    this.tipo = data[0].tipo;

                                    this.fijacion = (data[0].fijacion == null) ? new Memoria2() : data[0].fijacion; 
                                    this.reciente = (data[0].reciente == null) ? new Memoria2() : data[0].reciente;                                 
                                    this.remota = (data[0].remota == null) ? new Memoria2() : data[0].remota; 

                                    this.inteligencia = (data[0].inteligencia == null) ? new Inteligencia() : data[0].inteligencia; 
                                    this.introspeccion = (data[0].introspeccion == null) ? new Introspeccion() : data[0].introspeccion; 
                                    this.prospeccion = (data[0].prospeccion == null) ? new Introspeccion() : data[0].prospeccion; 
                                    this.juicio = (data[0].remota == null) ? new Introspeccion() : data[0].juicio; 

                                    this.alimentacion = (data[0].alimentacion == null) ? new Alimentacion() : data[0].alimentacion; 

                                    this.tipoAlimenticio = data[0].tipoAlimenticio;

                                    this.adecuado = (data[0].adecuado == null) ? new Opcion() : data[0].adecuado; 
                                    this.hipersomnio = (data[0].hipersomnio == null) ? new Opcion() : data[0].hipersomnio; 
                                    this.insomnio = (data[0].insomnio == null) ? new Opcion() : data[0].insomnio; 
                                    this.cociliacion = (data[0].cociliacion == null) ? new Opcion() : data[0].cociliacion; 
                                    this.reconciliacion = (data[0].reconciliacion == null) ? new Opcion() : data[0].reconciliacion; 
                                    this.global = (data[0].global == null) ? new Opcion() : data[0].global; 
                                }

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

    getImpresionDiagnostica2(idDiagnostico: String){
        this.showLoading(true);    
        this.cie10Service.getById(idDiagnostico)
            .subscribe(
                data => {      
                    this.impresionDiagnostica2 = data;                                                      
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

    getImpresionDiagnostica3(idDiagnostico: String){
        this.showLoading(true);    
        this.cie10Service.getById(idDiagnostico)
            .subscribe(
                data => {      
                    this.impresionDiagnostica3 = data;                                                      
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
        this.model.idImpresionDiagnostica2 = this.impresionDiagnostica2.idCie10;
        this.model.idImpresionDiagnostica3 = this.impresionDiagnostica3.idCie10;

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
                        this.errores.push({ message: 'No se encontró un paciente con esa identificación o no tiene una historia activa'});                        
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
        antecedente.causa = this.causa;

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
        farmacologico.eventoAdverso = this.eventoAdverso;
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
        
        ginecoObstetricio.embarazoActual = (this.embarazoActual.idOpcion == null) ? null : this.embarazoActual;
        ginecoObstetricio.gesta = (this.gesta.idGesta == null) ? null : this.gesta;

        this.model.ginecoObstetricios = [];
        this.model.ginecoObstetricios.push(ginecoObstetricio);        
    }

    addExamenFisico(){  
        let examenFisico = new ExamenFisico();

        examenFisico.apariencia = (this.apariencia.idApariencia == null) ? null : this.apariencia;  

        examenFisico.descripcionApariencia = this.descripcionApariencia;  

        examenFisico.signoVitalTa = this.signoVitalTa;
        examenFisico.signoVitalFc = this.signoVitalFc;
        examenFisico.signoVitalFr = this.signoVitalFr;
        examenFisico.signoVitalT = this.signoVitalT;  

        examenFisico.midriasis = (this.midriasis.idOpcion == null) ? null : this.midriasis;    
        examenFisico.miosis = (this.miosis.idOpcion == null) ? null : this.miosis;    
        examenFisico.anisocordia = (this.anisocordia.idOpcion == null) ? null : this.anisocordia;    
        examenFisico.pinral = (this.pinral.idOpcion == null) ? null : this.pinral;    

        examenFisico.otorragia = (this.otorragia.idOpcion == null) ? null : this.otorragia;        
        examenFisico.otoliquia = (this.otoliquia.idOpcion == null) ? null : this.otoliquia;        
        examenFisico.rinoloquia = (this.rinoloquia.idOpcion == null) ? null : this.rinoloquia;        
        examenFisico.epixtasis = (this.epixtasis.idOpcion == null) ? null : this.epixtasis;            
        examenFisico.murmulloVesicular = (this.murmulloVesicular.idOpcion == null) ? null : this.murmulloVesicular;        
        examenFisico.estertoresCrepitantes = (this.estertoresCrepitantes.idOpcion == null) ? null : this.estertoresCrepitantes;        
        examenFisico.roncus = (this.roncus.idOpcion == null) ? null : this.roncus;        
        examenFisico.sibilancias = (this.sibilancias.idOpcion == null) ? null : this.sibilancias;            
        examenFisico.silencioAuscultorio = (this.silencioAuscultorio.idOpcion == null) ? null : this.silencioAuscultorio;        
        examenFisico.murmulloVesicularPulmones = (this.murmulloVesicularPulmones.idOpcion == null) ? null : this.murmulloVesicularPulmones;           
        
        this.model.examenFisicos.push(examenFisico);  
    }   
    
    addExamenFisico2(){  
        let examenFisico2 = new ExamenFisico2();   
    
        examenFisico2.frotePericardial = (this.frotePericardial.idOpcion == null) ? null : this.frotePericardial;        
        examenFisico2.ruidosNoAuscultables = (this.ruidosNoAuscultables.idOpcion == null) ? null : this.ruidosNoAuscultables;        
        examenFisico2.arritmico = (this.arritmico.idOpcion == null) ? null : this.arritmico;        
        examenFisico2.soplo = (this.soplo.idOpcion == null) ? null : this.soplo;        
        examenFisico2.rsCsRsSinSoplo = (this.rsCsRsSinSoplo.idOpcion == null) ? null : this.rsCsRsSinSoplo;        
        examenFisico2.hepatomegalia = (this.hepatomegalia.idOpcion == null) ? null : this.hepatomegalia;        
        examenFisico2.esplenomegalia = (this.esplenomegalia.idOpcion == null) ? null : this.esplenomegalia;        
        examenFisico2.masaPalpable = (this.masaPalpable.idOpcion == null) ? null : this.masaPalpable;        
        examenFisico2.signosDeIrritacionPeritoneal = (this.signosDeIrritacionPeritoneal.idOpcion == null) ? null : this.signosDeIrritacionPeritoneal;        
        examenFisico2.sinAlteracionesEvidentes = (this.sinAlteracionesEvidentes.idOpcion == null) ? null : this.sinAlteracionesEvidentes;        
        examenFisico2.iieoParalitico = (this.iieoParalitico.idOpcion == null) ? null : this.iieoParalitico;        
        examenFisico2.ascitis = (this.ascitis.idOpcion == null) ? null : this.ascitis;        

        this.model.examenFisicos2.push(examenFisico2);  
    }

    addExamenFisico3(){  
        let examenFisico3 = new ExamenFisico3();       

        examenFisico3.llenadoCapilarAlterado = (this.llenadoCapilarAlterado.idOpcion == null) ? null : this.llenadoCapilarAlterado;        
        examenFisico3.pulsoAusentes = (this.pulsoAusentes.idOpcion == null) ? null : this.pulsoAusentes;        
        examenFisico3.deformidad = (this.deformidad.idOpcion == null) ? null : this.deformidad;        
        examenFisico3.movilidadAlterada = (this.movilidadAlterada.idOpcion == null) ? null : this.movilidadAlterada;        
        examenFisico3.pulsosPerifericosPresentes = (this.pulsosPerifericosPresentes.idOpcion == null) ? null : this.pulsosPerifericosPresentes;        
        examenFisico3.cianosis = (this.cianosis.idOpcion == null) ? null : this.cianosis;        
        examenFisico3.ictericia = (this.ictericia.idOpcion == null) ? null : this.ictericia;        
        examenFisico3.palidezMucocutanea = (this.palidezMucocutanea.idOpcion == null) ? null : this.palidezMucocutanea;        
        examenFisico3.hematomasEquimosisHeridas = (this.hematomasEquimosisHeridas.idOpcion == null) ? null : this.hematomasEquimosisHeridas;        
        examenFisico3.cicatricesTatuajes = (this.cicatricesTatuajes.idOpcion == null) ? null : this.cicatricesTatuajes;        
        examenFisico3.sinAlteracionesEvidentes = (this.sinAlteracionesEvidentes.idOpcion == null) ? null : this.sinAlteracionesEvidentes;        

        this.model.examenFisicos3.push(examenFisico3); 
    }

    addExamenFisico4(){
        let examenFisico4 = new ExamenFisico4();       

        examenFisico4.alerta = (this.alerta.idOpcion == null) ? null : this.alerta;         
        examenFisico4.somnolencia = (this.somnolencia.idOpcion == null) ? null : this.somnolencia;        
        examenFisico4.estupor = (this.estupor.idOpcion == null) ? null : this.estupor;        
        examenFisico4.comas = (this.comas.idOpcion == null) ? null : this.comas;        
        examenFisico4.agitacion = (this.agitacion.idOpcion == null) ? null : this.agitacion;        
        examenFisico4.reflejosMuscoloTendinosooAlterados = (this.reflejosMuscoloTendinosooAlterados.idOpcion == null) ? null : this.reflejosMuscoloTendinosooAlterados;        
        examenFisico4.signosmeningeosPresentes = (this.signosmeningeosPresentes.idOpcion == null) ? null : this.signosmeningeosPresentes;        
        examenFisico4.perdidaDeLaSensibilidad = (this.perdidaDeLaSensibilidad.idOpcion == null) ? null : this.perdidaDeLaSensibilidad;        
        examenFisico4.inconctinenciaUrinariaOFecal = (this.inconctinenciaUrinariaOFecal.idOpcion == null) ? null : this.inconctinenciaUrinariaOFecal;        
        examenFisico4.movimientosAnormales = (this.movimientosAnormales.idOpcion == null) ? null : this.movimientosAnormales;        
        examenFisico4.sinAlteracionesEvidentes = (this.sinAlteracionesEvidentes.idOpcion == null) ? null : this.sinAlteracionesEvidentes;        

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

        examenFisico5.estadoConciencia = (this.estadoConciencia.idEstadoConciencia == null) ? null : this.estadoConciencia;        
        
        if(this.fecha != undefined && this.fecha != ''){
            examenFisico5.fecha = Util.getDate(this.fecha);    	
        }
        
        examenFisico5.persona = (this.persona.idOpcion == null) ? null : this.persona;        
        examenFisico5.espacio = (this.espacio.idOpcion == null) ? null : this.espacio;        
        examenFisico5.tiempo = (this.tiempo.idOpcion == null) ? null : this.tiempo;        
        examenFisico5.euprosexico = (this.euprosexico.idOpcion == null) ? null : this.euprosexico;        
        examenFisico5.hipoprosexico = (this.hipoprosexico.idOpcion == null) ? null : this.hipoprosexico;        
        examenFisico5.eutimico = (this.eutimico.idOpcion == null) ? null : this.eutimico;        
        examenFisico5.depresivo = (this.depresivo.idOpcion == null) ? null : this.depresivo;        
        examenFisico5.expensivo = (this.expensivo.idOpcion == null) ? null : this.expensivo;        
        examenFisico5.hiperprosexico = (this.hiperprosexico.idOpcion == null) ? null : this.hiperprosexico;        

        examenFisico5.descripcion = this.descripcionExamenFisico5;

        examenFisico5.orgienNormal = (this.orgienNormal.idOpcion == null) ? null : this.orgienNormal;        
        examenFisico5.acustica = (this.acustica.idOpcion == null) ? null : this.acustica;        
        examenFisico5.concreto = (this.concreto.idOpcion == null) ? null : this.concreto;                
        examenFisico5.pobrezaIdeativa = (this.pobrezaIdeativa.idOpcion == null) ? null : this.pobrezaIdeativa;        
        examenFisico5.cursoNormal = (this.cursoNormal.idOpcion == null) ? null : this.cursoNormal;            
        examenFisico5.bridipsiquia = (this.bridipsiquia.idOpcion == null) ? null : this.bridipsiquia;        
        examenFisico5.taquipsiquia = (this.taquipsiquia.idOpcion == null) ? null : this.taquipsiquia;        
        examenFisico5.fugasDeIdea = (this.fugasDeIdea.idOpcion == null) ? null : this.fugasDeIdea;        
        examenFisico5.ideasDelirantes = (this.ideasDelirantes.idOpcion == null) ? null : this.ideasDelirantes;        
        examenFisico5.ideasRefenciales = (this.ideasRefenciales.idOpcion == null) ? null : this.ideasRefenciales;        
        examenFisico5.ideasObsesivas = (this.ideasObsesivas.idOpcion == null) ? null : this.ideasObsesivas;        
        examenFisico5.pensamientoMago = (this.pensamientoMago.idOpcion == null) ? null : this.pensamientoMago;        
    
        this.model.examenFisicos5.push(examenFisico5);  
    }

    addExamenFisico6(){
        let examenFisico6 = new ExamenFisico6();       

        examenFisico6.comprensible = (this.comprensible.idComprensible == null) ? null : this.comprensible;        

        examenFisico6.disartrias = (this.disartrias.idOpcion == null) ? null : this.disartrias;        

        examenFisico6.curso = (this.curso.idCurso == null) ? null : this.curso;        
        examenFisico6.asfixias = (this.asfixias.idAsfixia == null) ? null : this.asfixias;        
        examenFisico6.alucinaciones = (this.alucinaciones.idAlucinacion == null) ? null : this.alucinaciones;        

        examenFisico6.tipo = this.tipo;

        examenFisico6.fijacion = (this.fijacion.idMemoria2 == null) ? null : this.fijacion;        
        examenFisico6.reciente = (this.reciente.idMemoria2 == null) ? null : this.reciente;        
        examenFisico6.remota = (this.remota.idMemoria2 == null) ? null : this.remota;        

        examenFisico6.inteligencia = (this.inteligencia.idInteligencia == null) ? null : this.inteligencia;        
        examenFisico6.introspeccion = (this.introspeccion.idIntrospeccion == null) ? null : this.introspeccion;        
        examenFisico6.prospeccion = (this.prospeccion.idIntrospeccion == null) ? null : this.prospeccion;        

        examenFisico6.juicio = (this.juicio.idIntrospeccion == null) ? null : this.juicio;        
        examenFisico6.alimentacion = (this.alimentacion.idAlimentacion == null) ? null : this.alimentacion;        

        examenFisico6.tipoAlimenticio = this.tipoAlimenticio;        

        examenFisico6.adecuado = (this.adecuado.idOpcion == null) ? null : this.adecuado;        
        examenFisico6.hipersomnio = (this.hipersomnio.idOpcion == null) ? null : this.hipersomnio;        
        examenFisico6.insomnio = (this.insomnio.idOpcion == null) ? null : this.insomnio;        
        examenFisico6.cociliacion = (this.cociliacion.idOpcion == null) ? null : this.cociliacion;        
        examenFisico6.reconciliacion = (this.reconciliacion.idOpcion == null) ? null : this.reconciliacion;        
        examenFisico6.global = (this.global.idOpcion == null) ? null : this.global;        

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

    impresionDiagnostica2: any;

    searching2 = false;
    searchFailed2 = false;
    formatter2 = (x: {codigo: string, nombre: string}) => `(${x.codigo}) ${x.nombre}`;

    search2 = (text$: Observable<string>) =>
        text$.pipe(
        debounceTime(200),
        tap(() => this.searching2  = true),
        switchMap(
            term => term.length < 3 ? [] :
                this.cie10Service.search(term)
                    .pipe(
                        tap(() => this.searchFailed2 = false),
                        catchError(() => {
                            this.searchFailed2 = true;
                            return of([]);
                        })
                    )
        ),
        tap(() => this.searching2  = false)
    )

    impresionDiagnostica3: any;

    searching3 = false;
    searchFailed3 = false;
    formatter3 = (x: {codigo: string, nombre: string}) => `(${x.codigo}) ${x.nombre}`;

    search3 = (text$: Observable<string>) =>
        text$.pipe(
        debounceTime(200),
        tap(() => this.searching3  = true),
        switchMap(
            term => term.length < 3 ? [] :
                this.cie10Service.search(term)
                    .pipe(
                        tap(() => this.searchFailed3 = false),
                        catchError(() => {
                            this.searchFailed3 = true;
                            return of([]);
                        })
                    )
        ),
        tap(() => this.searching3 = false)
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
        this.causa = '';
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
        this.eventoAdverso = '';    
        this.tiempoDeUso = '';
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