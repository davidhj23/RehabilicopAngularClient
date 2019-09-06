import { Component, OnInit } from '@angular/core';
import { Util } from '../../../_utils';
import { Paciente } from '../pacientes/paciente';
import { Admision } from '../admisiones/admision';
import { PacienteService } from '../pacientes/paciente.service';
import { AdmisionService } from '../admisiones/admision.service';
import { EstadoService, Estado } from '../../listas/estados';
import { Opcion, OpcionService } from '../../listas/opciones';
import { TiempoUso, TiempoUsoService } from '../../listas/tiempos-usos';
import { Gesta, GestaService } from '../../listas/gestas';
import {debounceTime, distinctUntilChanged, map, tap, switchMap, catchError} from 'rxjs/operators';
import { of } from '../../../../../node_modules/rxjs/observable/of';
import { Cie10Service } from '../../listas/cie10s';
import { Observable } from '../../../../../node_modules/rxjs';
import { UserService } from '../../seguridad/usuarios/user.service';
import { AparienciaService, Apariencia } from '../../listas/apariencias';
import { EstadoConciencia, EstadoConcienciaService } from '../../listas/estados-conciencias';
import { Curso, CursoService } from '../../listas/cursos';
import { Asfixia, AsfixiaService } from '../../listas/asfixias';
import { Alucinacion, AlucinacionService } from '../../listas/alucinaciones';
import { Memoria2, Memoria2Service } from '../../listas/memoria2';
import { Inteligencia, InteligenciaService } from '../../listas/inteligencias';
import { Introspeccion, IntrospeccionService } from '../../listas/introspecciones';
import { Alimentacion, AlimentacionService } from '../../listas/alimentaciones';
import { User } from '../../seguridad/usuarios/user';
import { ComprensibleService, Comprensible } from '../../listas/comprensibles';
import { ActivatedRoute } from '@angular/router';
import { Historia } from '../historias/historia';
import { HistoriaService } from '../historias/historia.service';
import { ExamenFisico } from '../historias/ExamenFisico';
import { ExamenFisico2 } from '../historias/ExamenFisico2';
import { ExamenFisico3 } from '../historias/ExamenFisico3';

@Component({
    selector: 'verValoracionEnfermeria',
    templateUrl: 'verValoracionEnfermeria.component.html',
})

export class VerValoracionEnfermeriaComponent implements OnInit {       
    
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

    impresionDiagnostica: any;

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
                    this.medico = this.model.medico;
                    this.autoriza = this.model.autoriza;

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
                    this.impresionDiagnostica = `(${data.codigo}) ${data.nombre}`;                                                      
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
}