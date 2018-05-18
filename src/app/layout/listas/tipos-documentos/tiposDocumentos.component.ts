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

    TipoDocumento: TipoDocumento = new TipoDocumento();
    rowsOnPage = 5;

    model: any = {};
    error = '';
    loading = false;        

    constructor(
        private tipoDocumentoService: TipoDocumentoService,
        private router: Router,
        private ngbModal: NgbModal) {
        let self = this;
    }

    ngOnInit() {        
        this.loadAllTiposDocumentos();        
    }

    private loadAllTiposDocumentos() {        
        this.tipoDocumentoService.getAll().subscribe(
            tiposDocumentos => { 
                this.tiposDocumentos = tiposDocumentos; 
                this.temp = this.tiposDocumentos;
            });
    }

    create() {

        this.showError('');
        if(this.model.nombre == undefined || this.model.nombre == ''){
            this.showError('Nombre obligatorio');
            return;
        }

        this.showLoading(true);
        if(this.model.hiddenId == undefined){   
            this.tipoDocumentoService.create(this.model)
                .subscribe(
                    data => {
                        this.clearModel();
                        this.loadAllTiposDocumentos();
                        this.showLoading(false);
                    },
                    error => {
                        this.showErrors(error);
                    });
        }else{        
            this.model.idTipoDocumento = this.model.hiddenId;            
            this.tipoDocumentoService.update(this.model)
                .subscribe(
                    data => {
                        this.clearModel();
                        this.loadAllTiposDocumentos();
                        this.showLoading(false);
                    },
                    error => {
                        this.showErrors(error);
                    });
        }
    }     

    edit(id: string, nombre: string) {
        this.model.hiddenId = id;
        this.model.nombre = nombre;
    }

    delete(id: string, content: any) {        
        this.ngbModal.open(content).result.then((result) => {
            this.showLoading(true);
            this.tipoDocumentoService.delete(id)
                .subscribe(data => {                    
                    this.loadAllTiposDocumentos();                    
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