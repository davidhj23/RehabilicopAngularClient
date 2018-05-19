import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Servicio } from './servicio';
import { ServicioService } from './servicio.service';

@Component({
    selector: 'servicios',
    templateUrl: 'servicios.component.html',
})

export class ServiciosComponent implements OnInit {   
    
    servicios: Servicio[] = [];
    temp: Servicio[] = [];

    servicio: Servicio = new Servicio();
    rowsOnPage = 5;

    model: any = {};
    error = '';
    loading = false;        

    constructor(
        private servicioService: ServicioService,
        private router: Router,
        private ngbModal: NgbModal) {
        let self = this;
    }

    ngOnInit() {        
        this.loadAllServicios();        
    }

    private loadAllServicios() {        
        this.servicioService.getAll().subscribe(
            servicios => { 
                this.servicios = servicios; 
                this.temp = this.servicios;
            });
    }

    create() {

        this.showError('');
        if(this.model.nombre == undefined || this.model.nombre == ''){
            this.showError('Nombre obligatorio');
            return;
        }
        
        this.showLoading(true);
        if(this.model.hiddenId == undefined){   
            this.servicioService.create(this.model)
                .subscribe(
                    data => {
                        this.clearModel();
                        this.loadAllServicios();
                        this.showLoading(false);
                    },
                    error => {
                        this.showErrors(error);
                    });
        }else{        
            this.model.idServicio = this.model.hiddenId;            
            this.servicioService.update(this.model)
                .subscribe(
                    data => {
                        this.clearModel();
                        this.loadAllServicios();
                        this.showLoading(false);
                    },
                    error => {
                        this.showErrors(error);
                    });
        }
    }     

    edit(id: string, nombre: string) {
        this.model.hiddenId = id;
        this.model.nombre = nombre;
    }

    delete(id: string, content: any) {        
        this.ngbModal.open(content).result.then((result) => {
            this.showLoading(true);
            this.servicioService.delete(id)
                .subscribe(data => {                    
                    this.loadAllServicios();                    
                    this.showLoading(false);
                }, error => {                    
                    this.showErrors(error);
                })
        }, (reason) => {            
        });
    }

    showLoading(loading: boolean) {
        this.loading = loading;
    }

    showError(error: any){
        this.error = error;                      
        this.showLoading(false);
        setTimeout(function() {
            this.error = '';                            
        }.bind(this), 5000); 
    }

    showErrors(error: any){
        this.error = JSON.parse(error._body);                      
        this.showLoading(false);
        setTimeout(function() {
            this.error = '';                            
        }.bind(this), 5000); 
    }

    closeError() {
        this.error = '';
    }

    clearModel(){
        this.model.hiddenId = undefined;
        this.model.idServicio = '';
        this.model.nombre = '';
    }

    filtrarTabla(event: any) { 
        const val = event.target.value.toLowerCase();

        // filter our data
        const temp = this.temp.filter(function(d) {
            return d.nombre.toLowerCase().indexOf(val) !== -1 || !val;
        }); 

        this.servicios = temp;
    }
}