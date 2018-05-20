import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { TipoDocumento } from './tipoDocumento';
import { TipoDocumentoService } from './tipoDocumento.service';

@Component({
    selector: 'tiposDocumentos',
    templateUrl: 'tiposDocumentos.component.html',
})

export class TiposDocumentosComponent implements OnInit {   
    
    tiposDocumentos: TipoDocumento[] = [];
    temp: TipoDocumento[] = [];

    tipoDocumento: TipoDocumento = new TipoDocumento();
    rowsOnPage = 5;

    model: any = {};
    areErrors = false;
    errores: any[] = [];
    loading = false;        

    constructor(
        private tipoDocumentoService: TipoDocumentoService,
        private router: Router,
        private ngbModal: NgbModal) {
        let self = this;
    }

    ngOnInit() {        
        this.loadAllTipoDocumentos();        
    }

    private loadAllTipoDocumentos() {     
        this.showLoading(true);   
        this.tipoDocumentoService.getAll().subscribe(
            tiposDocumentos => { 
                this.tiposDocumentos = tiposDocumentos; 
                this.temp = this.tiposDocumentos;
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
            this.tipoDocumentoService.create(this.model)
                .subscribe(
                    data => {                        
                        this.clearModel();
                        this.loadAllTipoDocumentos();
                        this.showLoading(false);
                    },
                    error => {                        
                        this.errores = error.error;             
                        this.showErrors();
                        this.showLoading(false);
                    });
        }else{        
            this.model.idTipoDocumento = this.model.hiddenId;            
            this.tipoDocumentoService.update(this.model)
                .subscribe(
                    data => {
                        this.clearModel();
                        this.loadAllTipoDocumentos();
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
        this.model.hiddenId = model.idTipoDocumento;        
        this.model.nombre = model.nombre;
    }

    delete(idTipoDocumento: string, content: any) {   
        this.clearAndcloseErrors();    
        this.ngbModal.open(content).result.then((result) => {
            this.showLoading(true);
            this.tipoDocumentoService.delete(idTipoDocumento)
                .subscribe(data => {                    
                    this.loadAllTipoDocumentos();                    
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
        this.model.idTipoDocumento = '';        
        this.model.nombre = '';
    }

    filtrarTabla(event: any) { 
        const val = event.target.value.toLowerCase();

        // filter our data
        const temp = this.temp.filter(function(d) {
            return d.nombre.toLowerCase().indexOf(val) !== -1 || !val;
        }); 

        this.tiposDocumentos = temp;
    }
}