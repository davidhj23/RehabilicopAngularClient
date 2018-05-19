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

    TonoVoz: TonoVoz = new TonoVoz();
    rowsOnPage = 5;

    model: any = {};
    error = '';
    loading = false;        

    constructor(
        private tonoVozService: TonoVozService,
        private router: Router,
        private ngbModal: NgbModal) {
        let self = this;
    }

    ngOnInit() {        
        this.loadAllTonosVoz();        
    }

    private loadAllTonosVoz() {        
        this.tonoVozService.getAll().subscribe(
            tonosVoz => { 
                this.tonosVoz = tonosVoz; 
                this.temp = this.tonosVoz;
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
            this.tonoVozService.create(this.model)
                .subscribe(
                    data => {
                        this.clearModel();
                        this.loadAllTonosVoz();
                        this.showLoading(false);
                    },
                    error => {
                        this.showErrors(error);
                    });
        }else{        
            this.model.idTonoVoz = this.model.hiddenId;            
            this.tonoVozService.update(this.model)
                .subscribe(
                    data => {
                        this.clearModel();
                        this.loadAllTonosVoz();
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
            this.tonoVozService.delete(id)
                .subscribe(data => {                    
                    this.loadAllTonosVoz();                    
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