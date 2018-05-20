import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { EstadoCivil } from './estadoCivil';
import { EstadoCivilService } from './estadoCivil.service';

@Component({
    selector: 'estadosCiviles',
    templateUrl: 'estadosCiviles.component.html',
})

export class EstadosCivilesComponent implements OnInit {   
    
    estadosCiviles: EstadoCivil[] = [];
    temp: EstadoCivil[] = [];

    estadoCivil: EstadoCivil = new EstadoCivil();
    rowsOnPage = 5;

    model: any = {};
    areErrors = false;
    errores: any[] = [];
    loading = false;        

    constructor(
        private estadoCivilService: EstadoCivilService,
        private router: Router,
        private ngbModal: NgbModal) {
        let self = this;
    }

    ngOnInit() {        
        this.loadAllEstadoCiviles();        
    }

    private loadAllEstadoCiviles() {     
        this.showLoading(true);   
        this.estadoCivilService.getAll().subscribe(
            estadosCiviles => { 
                this.estadosCiviles = estadosCiviles; 
                this.temp = this.estadosCiviles;
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
            this.estadoCivilService.create(this.model)
                .subscribe(
                    data => {                        
                        this.clearModel();
                        this.loadAllEstadoCiviles();
                        this.showLoading(false);
                    },
                    error => {                        
                        this.errores = error.error;             
                        this.showErrors();
                        this.showLoading(false);
                    });
        }else{        
            this.model.idEstadoCivil = this.model.hiddenId;            
            this.estadoCivilService.update(this.model)
                .subscribe(
                    data => {
                        this.clearModel();
                        this.loadAllEstadoCiviles();
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
        this.model.hiddenId = model.idEstadoCivil;        
        this.model.nombre = model.nombre;
    }

    delete(idEstadoCivil: string, content: any) {   
        this.clearAndcloseErrors();
        this.ngbModal.open(content).result.then((result) => {
            this.showLoading(true);
            this.estadoCivilService.delete(idEstadoCivil)
                .subscribe(data => {                    
                    this.loadAllEstadoCiviles();                    
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
        this.model.idEstadoCivil = '';        
        this.model.nombre = '';
    }

    filtrarTabla(event: any) { 
        const val = event.target.value.toLowerCase();

        // filter our data
        const temp = this.temp.filter(function(d) {
            return d.nombre.toLowerCase().indexOf(val) !== -1 || !val;
        }); 

        this.estadosCiviles = temp;
    }
}