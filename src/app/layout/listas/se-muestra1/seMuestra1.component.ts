import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SeMuestra1 } from './seMuestra1';
import { SeMuestra1Service } from './seMuestra1.service';

@Component({
    selector: 'SeMuestra1',
    templateUrl: 'SeMuestra1.component.html',
})

export class SeMuestra1Component implements OnInit {   
    
    seMuestra1s: SeMuestra1[] = [];
    temp: SeMuestra1[] = [];

    seMuestra1: SeMuestra1 = new SeMuestra1();
    rowsOnPage = 5;

    model: any = {};
    areErrors = false;
    errores: any[] = [];
    loading = false;        

    constructor(
        private seMuestra1Service: SeMuestra1Service,
        private router: Router,
        private ngbModal: NgbModal) {
        let self = this;
    }

    ngOnInit() {        
        this.loadAllSeMuestra1s();        
    }

    private loadAllSeMuestra1s() {     
        this.showLoading(true);   
        this.seMuestra1Service.getAll().subscribe(
            seMuestra1s => { 
                this.seMuestra1s = seMuestra1s; 
                this.temp = this.seMuestra1s;
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
            this.seMuestra1Service.create(this.model)
                .subscribe(
                    data => {                        
                        this.clearModel();
                        this.loadAllSeMuestra1s();
                        this.showLoading(false);
                    },
                    error => {                        
                        this.errores = error.error;             
                        this.showErrors();
                        this.showLoading(false);
                    });
        }else{        
            this.model.idSeMuestra1 = this.model.hiddenId;            
            this.seMuestra1Service.update(this.model)
                .subscribe(
                    data => {
                        this.clearModel();
                        this.loadAllSeMuestra1s();
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
        this.model.hiddenId = model.idSeMuestra1;        
        this.model.nombre = model.nombre;
    }

    delete(idSeMuestra1: string, content: any) {   
        this.clearAndcloseErrors();  
        this.ngbModal.open(content).result.then((result) => {
            this.showLoading(true);
            this.seMuestra1Service.delete(idSeMuestra1)
                .subscribe(data => {                    
                    this.loadAllSeMuestra1s();                    
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
        this.model.idSeMuestra1 = '';        
        this.model.nombre = '';
    }

    filtrarTabla(event: any) { 
        const val = event.target.value.toLowerCase();

        // filter our data
        const temp = this.temp.filter(function(d) {
            return d.nombre.toLowerCase().indexOf(val) !== -1 || !val;
        }); 

        this.seMuestra1s = temp;
    }
}