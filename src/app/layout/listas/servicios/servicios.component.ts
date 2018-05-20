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
    areErrors = false;
    errores: any[] = [];
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
        this.showLoading(true);   
        this.servicioService.getAll().subscribe(
            servicios => { 
                this.servicios = servicios; 
                this.temp = this.servicios;
                this.showLoading(false);
            },
            error => {                        
                this.errores = error.error;             
                this.showErrors();
                this.showLoading(false);
            });
    }

    create() {

        let areErrors = false;
        this.clearAndcloseErrors();        

        if(this.model.nombre == undefined || this.model.nombre == ''){
            this.errores.push({ message: 'Nombre obligatorio'});
            areErrors = true;
        }

        if(areErrors){
            this.showErrors();
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
                        this.errores = error.error;             
                        this.showErrors();
                        this.showLoading(false);
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
                        this.errores = error.error;             
                        this.showErrors();
                        this.showLoading(false);
                    });
        }
    }     

    edit(model: any) {
        this.model.hiddenId = model.idServicio;        
        this.model.nombre = model.nombre;
    }

    delete(idServicio: string, content: any) {   
        this.clearAndcloseErrors(); 
        this.ngbModal.open(content).result.then((result) => {
            this.showLoading(true);
            this.servicioService.delete(idServicio)
                .subscribe(data => {                    
                    this.loadAllServicios();                    
                    this.showLoading(false);
                }, error => {       
                    this.errores = error.error;             
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