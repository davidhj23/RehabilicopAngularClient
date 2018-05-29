import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SeMuestra2 } from './seMuestra2';
import { SeMuestra2Service } from './seMuestra2.service';

@Component({
    selector: 'SeMuestra2',
    templateUrl: 'SeMuestra2.component.html',
})

export class SeMuestra2Component implements OnInit {   
    
    seMuestra2s: SeMuestra2[] = [];
    temp: SeMuestra2[] = [];

    seMuestra2: SeMuestra2 = new SeMuestra2();
    rowsOnPage = 5;

    model: any = {};
    areErrors = false;
    errores: any[] = [];
    loading = false;        

    constructor(
        private seMuestra2Service: SeMuestra2Service,
        private router: Router,
        private ngbModal: NgbModal) {
        let self = this;
    }

    ngOnInit() {        
        this.loadAllSeMuestra2s();        
    }

    private loadAllSeMuestra2s() {     
        this.showLoading(true);   
        this.seMuestra2Service.getAll().subscribe(
            seMuestra2s => { 
                this.seMuestra2s = seMuestra2s; 
                this.temp = this.seMuestra2s;
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
            this.seMuestra2Service.create(this.model)
                .subscribe(
                    data => {                        
                        this.clearModel();
                        this.loadAllSeMuestra2s();
                        this.showLoading(false);
                    },
                    error => {                        
                        this.errores = error.error;             
                        this.showErrors();
                        this.showLoading(false);
                    });
        }else{        
            this.model.idSeMuestra2 = this.model.hiddenId;            
            this.seMuestra2Service.update(this.model)
                .subscribe(
                    data => {
                        this.clearModel();
                        this.loadAllSeMuestra2s();
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
        this.model.hiddenId = model.idSeMuestra2;        
        this.model.nombre = model.nombre;
    }

    delete(idSeMuestra2: string, content: any) {   
        this.clearAndcloseErrors();  
        this.ngbModal.open(content).result.then((result) => {
            this.showLoading(true);
            this.seMuestra2Service.delete(idSeMuestra2)
                .subscribe(data => {                    
                    this.loadAllSeMuestra2s();                    
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
        }.bind(this), 20000); 
    }

    clearAndcloseErrors(){
        this.errores = [];
        this.areErrors = false;                            
    }

    clearModel(){
        this.model.hiddenId = undefined;
        this.model.idSeMuestra2 = '';        
        this.model.nombre = '';
    }

    filtrarTabla(event: any) { 
        const val = event.target.value.toLowerCase();

        // filter our data
        const temp = this.temp.filter(function(d) {
            return d.nombre.toLowerCase().indexOf(val) !== -1 || !val;
        }); 

        this.seMuestra2s = temp;
    }
}