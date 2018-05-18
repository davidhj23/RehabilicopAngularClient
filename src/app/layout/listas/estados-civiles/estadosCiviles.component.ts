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
    error = '';
    loading = false;        

    constructor(
        private estadoCivilService: EstadoCivilService,
        private router: Router,
        private ngbModal: NgbModal) {
        let self = this;
    }

    ngOnInit() {        
        this.loadAllEstadosCiviles();        
    }

    private loadAllEstadosCiviles() {        
        this.estadoCivilService.getAll().subscribe(
            estadosCiviles => { 
                this.estadosCiviles = estadosCiviles; 
                this.temp = this.estadosCiviles;
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
            this.estadoCivilService.create(this.model)
                .subscribe(
                    data => {
                        this.clearModel();
                        this.loadAllEstadosCiviles();
                        this.showLoading(false);
                    },
                    error => {
                        this.showErrors(error);
                    });
        }else{        
            this.model.idEstadoCivil = this.model.hiddenId;            
            this.estadoCivilService.update(this.model)
                .subscribe(
                    data => {
                        this.clearModel();
                        this.loadAllEstadosCiviles();
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
            this.estadoCivilService.delete(id)
                .subscribe(data => {                    
                    this.loadAllEstadosCiviles();                    
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