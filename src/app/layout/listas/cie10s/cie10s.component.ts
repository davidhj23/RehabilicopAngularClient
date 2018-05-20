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
    areErrors = false;
    errores: any[] = [];
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
        this.showLoading(true);   
        this.cie10Service.getAll().subscribe(
            cie10s => { 
                this.cie10s = cie10s; 
                this.temp = this.cie10s;
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

        if(this.model.codigo == undefined || this.model.codigo == ''){
            this.errores.push({ message: 'Código obligatorio'});
            areErrors = true;
        }

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
            this.cie10Service.create(this.model)
                .subscribe(
                    data => {                        
                        this.clearModel();
                        this.loadAllCie10s();
                        this.showLoading(false);
                    },
                    error => {                        
                        this.errores = error.error;             
                        this.showErrors();
                        this.showLoading(false);
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
                        this.errores = error.error;             
                        this.showErrors();
                        this.showLoading(false);
                    });
        }
    }     

    edit(model: any) {
        this.model.hiddenId = model.idCie10;
        this.model.codigo = model.codigo;
        this.model.nombre = model.nombre;
    }

    delete(idCie10: string, content: any) {   
        this.clearAndcloseErrors();
        this.ngbModal.open(content).result.then((result) => {
            this.showLoading(true);
            this.cie10Service.delete(idCie10)
                .subscribe(data => {                    
                    this.loadAllCie10s();                    
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
        this.model.idCie10 = '';
        this.model.codigo = '';
        this.model.nombre = '';
    }

    filtrarTabla(event: any) { 
        const val = event.target.value.toLowerCase();

        // filter our data
        const temp = this.temp.filter(function(d) {
            return d.nombre.toLowerCase().indexOf(val) !== -1 || 
                   d.codigo.toLowerCase().indexOf(val) !== -1 ||  !val;
        }); 

        this.cie10s = temp;
    }
}