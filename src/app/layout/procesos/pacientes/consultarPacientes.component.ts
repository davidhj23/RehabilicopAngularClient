import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { PacienteService } from './paciente.service';
import { Paciente } from './paciente';

@Component({
    selector: 'consultarPacientes',
    templateUrl: 'consultarPacientes.component.html',
})

export class ConsultarPacientesComponent implements OnInit {       
    
    pacientes: Paciente[] = [];
    temp: Paciente[] = [];
    model: any = {};
    modelToEdit: any = {};

    loading = false;        
    rowsOnPage = 5;
    
    areErrors = false;
    errores: any[] = [];   

    constructor(
        private pacienteService: PacienteService,
        private router: Router,
        private ngbModal: NgbModal) {
        let self = this;
    }

    ngOnInit() { 
        this.loadAllPacientes();           
    }    

    private loadAllPacientes() {     
        this.showLoading(true);   
        this.pacienteService.getAll().subscribe(
            pacientes => {                                 
                this.pacientes = pacientes; 
                this.temp = this.pacientes;
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

    filtrarTabla(event: any) { 
        const val = event.target.value.toLowerCase();

        // filter our data
        const temp = this.temp.filter(function(d) {
            return d.nombres.toLowerCase().indexOf(val) !== -1 || !val;
        }); 

        this.pacientes = temp;
    }

    new(){
        
    }

    edit(model: any) {            
        this.router.navigate(['/layout/procesos/pacientes/editar', model.idUsuario]);
    }

    delete(idPaciente: string, content: any) {   
        this.clearAndcloseErrors();     
        this.ngbModal.open(content).result.then((result) => {
            this.showLoading(true);
            this.pacienteService.delete(idPaciente)
                .subscribe(data => {                    
                    this.loadAllPacientes();                    
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