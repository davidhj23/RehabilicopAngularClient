import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
import { MedicamentoService, Medicamento } from '../../listas/medicamentos';
import { Dosis, DosisService } from '../../listas/dosis';
import { User } from '../../seguridad/usuarios/user';
import { UserService } from '../../seguridad/usuarios/user.service';
import { Administracion } from '../orden-medica/administracion';
import { MedicamentosOrdenMedica } from '../orden-medica/medicamentosOrdenMedica';
import { OrdenMedicaService } from '../orden-medica/ordenMedica.service';
import { OrdenMedica } from '../orden-medica/ordenMedica';

@Component({
    selector: 'editarAdministracion',
    templateUrl: 'editarAdministracion.component.html',
})

export class EditarAdministracionComponent implements OnInit {   
    
    currentOrdenId: string;
    model: OrdenMedica;

    medicamentosOrdenMedica: MedicamentosOrdenMedica[] = [];

    tipoDocumento: string;
    edad: string;
    sexo: string;
    tipoEntidad: string;
    aseguradora: string;

    solicitante: string;
    quienEntrega: string;
    quienRecibe: string;

    loading = false;        
    rowsOnPage = 5;
    
    areErrors = false;
    errores: any[] = []; 
    public mask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]
    public horaMask = [/\d/, /\d/, ':', /\d/, /\d/]
    listaAdministra: any[] = []; 

    constructor(
        private ordenMedicaService: OrdenMedicaService,        
        private usuarioService: UserService,        
        private route: ActivatedRoute,
        private router: Router) {

            this.model = new OrdenMedica();
            this.model.historia = new Historia();
            this.model.historia.admision = new Admision();
            this.model.historia.admision.paciente = new Paciente();

            this.route.params.subscribe( 
                params => {
                    this.currentOrdenId = params['id'];
                }
            );
    }

    ngOnInit() {   
        this.showLoading(true);    
        this.ordenMedicaService.getById(this.currentOrdenId)
            .subscribe(
                data => {                                                 
                    this.model = data;                                                 
                    this.tipoDocumento = this.model.historia.admision.paciente.tipoDocumento.nombre;                                                       
                    this.edad = Util.calculateAge(this.model.historia.admision.paciente.fechaDeNacimiento).toString();                                                       
                    
                    if (this.model.historia.admision.paciente.sexo != null && 
                        this.model.historia.admision.paciente.sexo != undefined)
                        this.sexo = this.model.historia.admision.paciente.sexo.nombre;  

                    this.tipoEntidad = this.model.historia.admision.paciente.tipoEntidad.nombre;  

                    if(this.model.historia.admision.paciente.aseguradora != null){
                        this.aseguradora = this.model.historia.admision.paciente.aseguradora.nombre;                                                        
                    }

                    this.solicitante = this.model.solicitante.nombres + " " + this.model.solicitante.apellidos;
                    this.quienEntrega = this.model.quienEntrega.nombres + " " + this.model.quienEntrega.apellidos;
                    this.quienRecibe = this.model.quienRecibe.nombres + " " + this.model.quienRecibe.apellidos;

                    this.showLoading(false);    

                    this.showLoading(true);    
                    this.ordenMedicaService.getMedicamentosByIdOrdenMedica(this.currentOrdenId)
                        .subscribe(
                            data => {                                                                         
                                this.model.medicamentosOrdenMedica = data;  
                                this.model.medicamentosOrdenMedica.forEach(x => {
                                    this.ordenMedicaService.getAdministraciones(x.idMedicamentosOrdenMedica)
                                        .subscribe(
                                            data => {                                                                         
                                                x.administraciones = data;    
                                                x.administraciones.forEach(x => {                                                             
                                                    if(x.administra == null)
                                                    {
                                                        x.administra = new User();
                                                    }
                                                });                
                                        })    
                                });
                                
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
                
                this.showLoading(true);    
                this.usuarioService.getAllJefesEnfermerias()
                    .subscribe(
                        data => {      
                            this.listaAdministra = data;                    
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

    create(){
        this.showLoading(true);    
        
        this.ordenMedicaService.update(this.model)
            .subscribe(
                data => {                        
                    this.showLoading(false);
                    this.router.navigate(['/layout/procesos/historias/consultar-administracion']); 
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
        
        setTimeout(function() {
            this.clearAndcloseErrors();
        }.bind(this), 10000); 
    }

    clearAndcloseErrors(){
        this.errores = [];
        this.areErrors = false;
    }
}