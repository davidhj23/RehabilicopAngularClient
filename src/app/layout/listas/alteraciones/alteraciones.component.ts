import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Alteracion } from './alteracion';
import { AlteracionService } from './alteracion.service';

@Component({
    selector: 'alteraciones',
    templateUrl: 'alteraciones.component.html',
})

export class AlteracionesComponent implements OnInit {   
    
    alteraciones: Alteracion[] = [];
    temp: Alteracion[] = [];

    alteracion: Alteracion = new Alteracion();
    rowsOnPage = 5;

    model: any = {};
    areErrors = false;
    errores: any[] = [];
    loading = false;        

    constructor(
        private alteracionService: AlteracionService,
        private router: Router,
        private ngbModal: NgbModal) {
        let self = this;
    }

    ngOnInit() {        
        this.loadAllAlteraciones();        
    }

    private loadAllAlteraciones() {     
        this.showLoading(true);   
        this.alteracionService.getAll().subscribe(
            alteraciones => { 
                this.alteraciones = alteraciones; 
                this.temp = this.alteraciones;
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
            this.alteracionService.create(this.model)
                .subscribe(
                    data => {                        
                        this.clearModel();
                        this.loadAllAlteraciones();
                        this.showLoading(false);
                    },
                    error => {                        
                        this.errores = error.error;             
                        this.showErrors();
                        this.showLoading(false);
                    });
        }else{        
            this.model.idAlteracion = this.model.hiddenId;            
            this.alteracionService.update(this.model)
                .subscribe(
                    data => {
                        this.clearModel();
                        this.loadAllAlteraciones();
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
        this.model.hiddenId = model.idAlteracion;        
        this.model.nombre = model.nombre;
    }

    delete(idAlteracion: string, content: any) {   
        this.clearAndcloseErrors();  
        this.ngbModal.open(content).result.then((result) => {
            this.showLoading(true);
            this.alteracionService.delete(idAlteracion)
                .subscribe(data => {                    
                    this.loadAllAlteraciones();                    
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
        this.model.idAlteracion = '';        
        this.model.nombre = '';
    }

    filtrarTabla(event: any) { 
        const val = event.target.value.toLowerCase();

        // filter our data
        const temp = this.temp.filter(function(d) {
            return d.nombre.toLowerCase().indexOf(val) !== -1 || !val;
        }); 

        this.alteraciones = temp;
    }
}