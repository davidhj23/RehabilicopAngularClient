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
    error = '';
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
        this.patronService.getAll().subscribe(
            patrones => { 
                this.patrones = patrones; 
                this.temp = this.patrones;
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
            this.patronService.create(this.model)
                .subscribe(
                    data => {
                        this.clearModel();
                        this.loadAllPatrones();
                        this.showLoading(false);
                    },
                    error => {
                        this.showErrors(error);
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
            this.patronService.delete(id)
                .subscribe(data => {                    
                    this.loadAllPatrones();                    
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