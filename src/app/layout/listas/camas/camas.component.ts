import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Cama } from './cama';
import { CamaService } from './cama.service';

@Component({
    selector: 'camas',
    templateUrl: 'camas.component.html',
})

export class CamasComponent implements OnInit {   
    
    camas: Cama[] = [];
    temp: Cama[] = [];

    cama: Cama = new Cama();
    rowsOnPage = 5;

    model: any = {};
    areErrors = false;
    errores: any[] = [];
    loading = false;        

    constructor(
        private camaService: CamaService,
        private router: Router,
        private ngbModal: NgbModal) {
        let self = this;
    }

    ngOnInit() {        
        this.loadAllCamas();        
    }

    private loadAllCamas() {     
        this.showLoading(true);   
        this.camaService.getAll().subscribe(
            camas => { 
                this.camas = camas; 
                this.temp = this.camas;
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
            this.camaService.create(this.model)
                .subscribe(
                    data => {                        
                        this.clearModel();
                        this.loadAllCamas();
                        this.showLoading(false);
                    },
                    error => {                        
                        this.errores = error.error;             
                        this.showErrors();
                        this.showLoading(false);
                    });
        }else{        
            this.model.idCama = this.model.hiddenId;            
            this.camaService.update(this.model)
                .subscribe(
                    data => {
                        this.clearModel();
                        this.loadAllCamas();
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
        this.model.hiddenId = model.idCama;        
        this.model.nombre = model.nombre;
    }

    delete(idCama: string, content: any) {   
        this.clearAndcloseErrors();   
        this.ngbModal.open(content).result.then((result) => {
            this.showLoading(true);
            this.camaService.delete(idCama)
                .subscribe(data => {                    
                    this.loadAllCamas();                    
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
        this.model.idCama = '';        
        this.model.nombre = '';
    }

    filtrarTabla(event: any) { 
        const val = event.target.value.toLowerCase();

        // filter our data
        const temp = this.temp.filter(function(d) {
            return d.nombre.toLowerCase().indexOf(val) !== -1 || !val;
        }); 

        this.camas = temp;
    }
}