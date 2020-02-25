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
import { OrdenMedica } from './ordenMedica';
import { OrdenMedicaService } from './ordenMedica.service';
import { MedicamentoService, Medicamento } from '../../listas/medicamentos';
import { Dosis, DosisService } from '../../listas/dosis';
import { User } from '../../seguridad/usuarios/user';
import { MedicamentosOrdenMedica } from './medicamentosOrdenMedica';
import { UserService } from '../../seguridad/usuarios/user.service';

@Component({
    selector: 'editarOrdenMedica',
    templateUrl: 'editarOrdenMedica.component.html',
})

export class EditarOrdenMedicaComponent implements OnInit {   
    
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

    constructor(
        private ordenMedicaService: OrdenMedicaService,        
        private route: ActivatedRoute,
        private ngbModal: NgbModal) {

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

                    this.medicamentosOrdenMedica = this.model.medicamentosOrdenMedica;

                    this.showLoading(false);    

                    this.loadMedicamentos();
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

    loadMedicamentos()
    {
        this.showLoading(true);    
        this.ordenMedicaService.getMedicamentosByIdOrdenMedica(this.currentOrdenId)
            .subscribe(
                data => {                                                                         
                    this.medicamentosOrdenMedica = data;  
                    this.medicamentosOrdenMedica.forEach(x => {
                        this.ordenMedicaService.getAdministraciones(x.idMedicamentosOrdenMedica)
                            .subscribe(
                                data => {                                                                         
                                    x.administraciones = data;                                              
                            })    
                    });
                    
                    this.showLoading(false);             
            })        
    }

    create(){
        this.showLoading(true);  
        this.model.medicamentosOrdenMedica = this.medicamentosOrdenMedica;  
        this.ordenMedicaService.update(this.model)
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

    deleteMedicamento(id: any, content: any) {   
        this.clearAndcloseErrors();  
        console.log(id)
        this.ngbModal.open(content).result.then((result) => {
            this.showLoading(true);
            this.ordenMedicaService.deleteMedicamentos(id)
                .subscribe(data => {                    
                    this.loadMedicamentos();                    
                    this.showLoading(false);
                }, error => {       
                    if(Array.isArray(error.error)){
                        this.errores = error.error;
                    }else{
                        let errores = [];
                        errores.push(error.error);
                        this.errores = errores;
                    } 
                    this.showErrors();
                    this.showLoading(false);
                })
        }, (reason) => {            
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