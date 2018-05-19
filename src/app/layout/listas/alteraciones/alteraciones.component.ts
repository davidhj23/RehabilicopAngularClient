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
    error = '';
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
        this.alteracionService.getAll().subscribe(
            alteraciones => { 
                console.log(alteraciones)
                this.alteraciones = alteraciones; 
                this.temp = this.alteraciones;
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
            this.alteracionService.create(this.model)
                .subscribe(
                    data => {
                        this.clearModel();
                        this.loadAllAlteraciones();
                        this.showLoading(false);
                    },
                    error => {
                        this.showErrors(error);
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
            this.alteracionService.delete(id)
                .subscribe(data => {                    
                    this.loadAllAlteraciones();                    
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