import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Movilidad } from './movilidad';
import { MovilidadService } from './movilidad.service';

@Component({
    selector: 'movilidad',
    templateUrl: 'movilidad.component.html',
})

export class MovilidadComponent implements OnInit {   
    
    movilidads: Movilidad[] = [];
    temp: Movilidad[] = [];

    movilidad: Movilidad = new Movilidad();
    rowsOnPage = 5;

    model: any = {};
    areErrors = false;
    errores: any[] = [];
    loading = false;        

    constructor(
        private movilidadService: MovilidadService,
        private router: Router,
        private ngbModal: NgbModal) {
        let self = this;
    }

    ngOnInit() {        
        this.loadAllMovilidades();        
    }

    private loadAllMovilidades() {     
        this.showLoading(true);   
        this.movilidadService.getAll().subscribe(
            movilidads => { 
                this.movilidads = movilidads; 
                this.temp = this.movilidads;
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
            this.movilidadService.create(this.model)
                .subscribe(
                    data => {                        
                        this.clearModel();
                        this.loadAllMovilidades();
                        this.showLoading(false);
                    },
                    error => {                        
                        this.errores = error.error;             
                        this.showErrors();
                        this.showLoading(false);
                    });
        }else{        
            this.model.idMovilidad = this.model.hiddenId;            
            this.movilidadService.update(this.model)
                .subscribe(
                    data => {
                        this.clearModel();
                        this.loadAllMovilidades();
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
        this.model.hiddenId = model.idMovilidad;        
        this.model.nombre = model.nombre;
    }

    delete(idMovilidad: string, content: any) {   
        this.clearAndcloseErrors();   
        this.ngbModal.open(content).result.then((result) => {
            this.showLoading(true);
            this.movilidadService.delete(idMovilidad)
                .subscribe(data => {                    
                    this.loadAllMovilidades();                    
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
        this.model.idMovilidad = '';        
        this.model.nombre = '';
    }

    filtrarTabla(event: any) { 
        const val = event.target.value.toLowerCase();

        // filter our data
        const temp = this.temp.filter(function(d) {
            return d.nombre.toLowerCase().indexOf(val) !== -1 || !val;
        }); 

        this.movilidads = temp;
    }
}