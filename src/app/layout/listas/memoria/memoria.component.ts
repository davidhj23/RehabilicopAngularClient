import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Memoria } from './memoria';
import { MemoriaService } from './memoria.service';

@Component({
    selector: 'memoria',
    templateUrl: 'memoria.component.html',
})

export class MemoriaComponent implements OnInit {   
    
    memorias: Memoria[] = [];
    temp: Memoria[] = [];

    memoria: Memoria = new Memoria();
    rowsOnPage = 5;

    model: any = {};
    areErrors = false;
    errores: any[] = [];
    loading = false;        

    constructor(
        private memoriaService: MemoriaService,
        private router: Router,
        private ngbModal: NgbModal) {
        let self = this;
    }

    ngOnInit() {        
        this.loadAllMemorias();        
    }

    private loadAllMemorias() {     
        this.showLoading(true);   
        this.memoriaService.getAll().subscribe(
            memorias => { 
                this.memorias = memorias; 
                this.temp = this.memorias;
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
            this.memoriaService.create(this.model)
                .subscribe(
                    data => {                        
                        this.clearModel();
                        this.loadAllMemorias();
                        this.showLoading(false);
                    },
                    error => {                        
                        this.errores = error.error;             
                        this.showErrors();
                        this.showLoading(false);
                    });
        }else{        
            this.model.idMemoria = this.model.hiddenId;            
            this.memoriaService.update(this.model)
                .subscribe(
                    data => {
                        this.clearModel();
                        this.loadAllMemorias();
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
        this.model.hiddenId = model.idMemoria;        
        this.model.nombre = model.nombre;
    }

    delete(idMemoria: string, content: any) {   
        this.clearAndcloseErrors();   
        this.ngbModal.open(content).result.then((result) => {
            this.showLoading(true);
            this.memoriaService.delete(idMemoria)
                .subscribe(data => {                    
                    this.loadAllMemorias();                    
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
        this.model.idMemoria = '';        
        this.model.nombre = '';
    }

    filtrarTabla(event: any) { 
        const val = event.target.value.toLowerCase();

        // filter our data
        const temp = this.temp.filter(function(d) {
            return d.nombre.toLowerCase().indexOf(val) !== -1 || !val;
        }); 

        this.memorias = temp;
    }
}