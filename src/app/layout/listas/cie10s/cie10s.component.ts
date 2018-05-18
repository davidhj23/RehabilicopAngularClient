import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Cie10 } from './cie10';
import { Cie10Service } from './cie10.service';

@Component({
    selector: 'cie10s',
    templateUrl: 'cie10s.component.html',
})

export class Cie10sComponent implements OnInit {   
    
    cie10s: Cie10[] = [];
    temp: Cie10[] = [];

    cie10: Cie10 = new Cie10();
    rowsOnPage = 5;

    model: any = {};
    error = '';
    loading = false;        

    constructor(
        private cie10Service: Cie10Service,
        private router: Router,
        private ngbModal: NgbModal) {
        let self = this;
    }

    ngOnInit() {        
        this.loadAllCie10s();        
    }

    private loadAllCie10s() {        
        this.cie10Service.getAll().subscribe(
            cie10s => { 
                this.cie10s = cie10s; 
                this.temp = this.cie10s;
            });
    }

    create() {

        this.showError('');        
        
        if(this.model.codigo == undefined || this.model.codigo == ''){
            this.showError('Código obligatorio');
            return;
        }

        if(this.model.nombre == undefined || this.model.nombre == ''){
            this.showError('Nombre obligatorio');
            return;
        }

        this.showLoading(true);        
        if(this.model.hiddenId == undefined){   
            this.cie10Service.create(this.model)
                .subscribe(
                    data => {
                        this.clearModel();
                        this.loadAllCie10s();
                        this.showLoading(false);
                    },
                    error => {
                        this.showErrors(error);
                    });
        }else{        
            this.model.idCie10 = this.model.hiddenId;            
            this.cie10Service.update(this.model)
                .subscribe(
                    data => {
                        this.clearModel();
                        this.loadAllCie10s();
                        this.showLoading(false);
                    },
                    error => {
                        this.showErrors(error);
                    });
        }
    }     

    edit(model: any) {
        this.model.hiddenId = model.idCie10;
        this.model.codigo = model.codigo;
        this.model.nombre = model.nombre;
    }

    delete(idCie10: string, content: any) {        
        this.ngbModal.open(content).result.then((result) => {
            this.showLoading(true);
            this.cie10Service.delete(idCie10)
                .subscribe(data => {                    
                    this.loadAllCie10s();                    
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
        this.model.idCie10 = '';
        this.model.codigo = '';
        this.model.nombre = '';
    }

    filtrarTabla(event: any) { 
        const val = event.target.value.toLowerCase();

        // filter our data
        const temp = this.temp.filter(function(d) {
            return d.nombre.toLowerCase().indexOf(val) !== -1 || !val;
        }); 

        this.cie10s = temp;
    }
}