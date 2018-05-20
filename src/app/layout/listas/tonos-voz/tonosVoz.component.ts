import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { TonoVoz } from './tonoVoz';
import { TonoVozService } from './tonoVoz.service';

@Component({
    selector: 'tonosVoz',
    templateUrl: 'tonosVoz.component.html',
})

export class TonosVozComponent implements OnInit {   
    
    tonosVoz: TonoVoz[] = [];
    temp: TonoVoz[] = [];

    tonoVoz: TonoVoz = new TonoVoz();
    rowsOnPage = 5;

    model: any = {};
    areErrors = false;
    errores: any[] = [];
    loading = false;        

    constructor(
        private tonoVozService: TonoVozService,
        private router: Router,
        private ngbModal: NgbModal) {
        let self = this;
    }

    ngOnInit() {        
        this.loadAllTonoVozs();        
    }

    private loadAllTonoVozs() {     
        this.showLoading(true);   
        this.tonoVozService.getAll().subscribe(
            tonosVoz => { 
                this.tonosVoz = tonosVoz; 
                this.temp = this.tonosVoz;
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
            this.tonoVozService.create(this.model)
                .subscribe(
                    data => {                        
                        this.clearModel();
                        this.loadAllTonoVozs();
                        this.showLoading(false);
                    },
                    error => {                        
                        this.errores = error.error;             
                        this.showErrors();
                        this.showLoading(false);
                    });
        }else{        
            this.model.idTonoVoz = this.model.hiddenId;            
            this.tonoVozService.update(this.model)
                .subscribe(
                    data => {
                        this.clearModel();
                        this.loadAllTonoVozs();
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
        this.model.hiddenId = model.idTonoVoz;        
        this.model.nombre = model.nombre;
    }

    delete(idTonoVoz: string, content: any) {   
        this.clearAndcloseErrors(); 
        this.ngbModal.open(content).result.then((result) => {
            this.showLoading(true);
            this.tonoVozService.delete(idTonoVoz)
                .subscribe(data => {                    
                    this.loadAllTonoVozs();                    
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
        this.model.idTonoVoz = '';        
        this.model.nombre = '';
    }

    filtrarTabla(event: any) { 
        const val = event.target.value.toLowerCase();

        // filter our data
        const temp = this.temp.filter(function(d) {
            return d.nombre.toLowerCase().indexOf(val) !== -1 || !val;
        }); 

        this.tonosVoz = temp;
    }
}