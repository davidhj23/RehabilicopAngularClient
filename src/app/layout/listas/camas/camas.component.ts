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
    error = '';
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
        this.camaService.getAll().subscribe(
            camas => { 
                this.camas = camas; 
                this.temp = this.camas;
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
            this.camaService.create(this.model)
                .subscribe(
                    data => {
                        this.clearModel();
                        this.loadAllCamas();
                        this.showLoading(false);
                    },
                    error => {
                        this.showErrors(error);
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
                        this.showErrors(error);
                    });
        }
    }     

    edit(model: any) {
        this.model.hiddenId = model.idCama;        
        this.model.nombre = model.nombre;
    }

    delete(idCama: string, content: any) {        
        this.ngbModal.open(content).result.then((result) => {
            this.showLoading(true);
            this.camaService.delete(idCama)
                .subscribe(data => {                    
                    this.loadAllCamas();                    
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
        this.model.idCama = '';
        this.model.codigo = '';
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