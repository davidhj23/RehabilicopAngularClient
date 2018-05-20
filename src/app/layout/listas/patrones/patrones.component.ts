import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Patron } from './patron';
import { PatronService } from './patron.service';

@Component({
    selector: 'patrones',
    templateUrl: 'patrones.component.html',
})

export class PatronesComponent implements OnInit {   
    
    patrones: Patron[] = [];
    temp: Patron[] = [];

    patron: Patron = new Patron();
    rowsOnPage = 5;

    model: any = {};
    areErrors = false;
    errores: any[] = [];
    loading = false;        

    constructor(
        private patronService: PatronService,
        private router: Router,
        private ngbModal: NgbModal) {
        let self = this;
    }

    ngOnInit() {        
        this.loadAllPatrones();        
    }

    private loadAllPatrones() {     
        this.showLoading(true);   
        this.patronService.getAll().subscribe(
            patrones => { 
                this.patrones = patrones; 
                this.temp = this.patrones;
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
            this.patronService.create(this.model)
                .subscribe(
                    data => {                        
                        this.clearModel();
                        this.loadAllPatrones();
                        this.showLoading(false);
                    },
                    error => {                        
                        this.errores = error.error;             
                        this.showErrors();
                        this.showLoading(false);
                    });
        }else{        
            this.model.idPatron = this.model.hiddenId;            
            this.patronService.update(this.model)
                .subscribe(
                    data => {
                        this.clearModel();
                        this.loadAllPatrones();
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
        this.model.hiddenId = model.idPatron;        
        this.model.nombre = model.nombre;
    }

    delete(idPatron: string, content: any) {   
        this.clearAndcloseErrors();    
        this.ngbModal.open(content).result.then((result) => {
            this.showLoading(true);
            this.patronService.delete(idPatron)
                .subscribe(data => {                    
                    this.loadAllPatrones();                    
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
        this.model.idPatron = '';        
        this.model.nombre = '';
    }

    filtrarTabla(event: any) { 
        const val = event.target.value.toLowerCase();

        // filter our data
        const temp = this.temp.filter(function(d) {
            return d.nombre.toLowerCase().indexOf(val) !== -1 || !val;
        }); 

        this.patrones = temp;
    }
}