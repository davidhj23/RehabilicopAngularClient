import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Historia } from './historia';
import { HistoriaService } from './historia.service';
import { Util } from '../../../_utils';

@Component({
    selector: 'consultarHistorias',
    templateUrl: 'consultarHistorias.component.html',
})

export class ConsultarHistoriasComponent implements OnInit {       
    
    historias: Historia[] = [];
    temp: Historia[] = [];
    model: any = {};
    modelToEdit: any = {};

    loading = false;        
    rowsOnPage = 5;
    
    areErrors = false;
    errores: any[] = [];   

    constructor(
        private historiaService: HistoriaService,
        private router: Router,
        private ngbModal: NgbModal) {
        
    }

    ngOnInit() { 
        this.loadAllHistorias();           
    }    

    private loadAllHistorias() {     
        this.showLoading(true);   
        this.historiaService.getAll().subscribe(
            historias => {                            
                this.historias = historias; 
                this.temp = this.historias;
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
            return d.admision.paciente.nombres.toLowerCase().indexOf(val) !== -1 || 
                   d.admision.paciente.apellidos.toLowerCase().indexOf(val) !== -1 ||
                   d.admision.paciente.identificacion.toLowerCase().indexOf(val) !== -1 || 
                   d.admision.paciente.identificacion.toLowerCase().indexOf(val) !== -1 || 
                   d.admision.estado.toLowerCase().indexOf(val) !== -1 ||
                   Util.formattedDate(d.fechaDeInicio).indexOf(val) !== -1 || !val;
        }); 

        this.historias = temp;
    }

    edit(model: any) {            
        this.router.navigate(['/layout/procesos/historias/editar', model.idHistoria]);
    }

    delete(idHistoria: string, content: any) {   
        this.clearAndcloseErrors();     
        this.ngbModal.open(content).result.then((result) => {
            this.showLoading(true);
            this.historiaService.delete(idHistoria)
                .subscribe(data => {                    
                    this.loadAllHistorias();                    
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