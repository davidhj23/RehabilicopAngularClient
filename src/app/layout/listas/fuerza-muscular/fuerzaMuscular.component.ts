import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FuerzaMuscular } from './fuerzaMuscular';
import { FuerzaMuscularService } from './fuerzaMuscular.service';

@Component({
    selector: 'fuerzaMuscular',
    templateUrl: 'fuerzaMuscular.component.html',
})

export class FuerzaMuscularComponent implements OnInit {   
    
    fuerzasMusculares: FuerzaMuscular[] = [];
    temp: FuerzaMuscular[] = [];

    fuerzaMuscular: FuerzaMuscular = new FuerzaMuscular();
    rowsOnPage = 5;

    model: any = {};
    areErrors = false;
    errores: any[] = [];
    loading = false;        

    constructor(
        private fuerzaMuscularService: FuerzaMuscularService,
        private router: Router,
        private ngbModal: NgbModal) {
        let self = this;
    }

    ngOnInit() {        
        this.loadAllFuerzaMusculares();        
    }

    private loadAllFuerzaMusculares() {     
        this.showLoading(true);   
        this.fuerzaMuscularService.getAll().subscribe(
            fuerzasMusculares => { 
                this.fuerzasMusculares = fuerzasMusculares; 
                this.temp = this.fuerzasMusculares;
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
            this.fuerzaMuscularService.create(this.model)
                .subscribe(
                    data => {                        
                        this.clearModel();
                        this.loadAllFuerzaMusculares();
                        this.showLoading(false);
                    },
                    error => {                        
                        this.errores = error.error;             
                        this.showErrors();
                        this.showLoading(false);
                    });
        }else{        
            this.model.idFuerzaMuscular = this.model.hiddenId;            
            this.fuerzaMuscularService.update(this.model)
                .subscribe(
                    data => {
                        this.clearModel();
                        this.loadAllFuerzaMusculares();
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
        this.model.hiddenId = model.idFuerzaMuscular;        
        this.model.nombre = model.nombre;
    }

    delete(idFuerzaMuscular: string, content: any) {   
        this.clearAndcloseErrors();
        this.ngbModal.open(content).result.then((result) => {
            this.showLoading(true);
            this.fuerzaMuscularService.delete(idFuerzaMuscular)
                .subscribe(data => {                    
                    this.loadAllFuerzaMusculares();                    
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
        this.model.idFuerzaMuscular = '';        
        this.model.nombre = '';
    }

    filtrarTabla(event: any) { 
        const val = event.target.value.toLowerCase();

        // filter our data
        const temp = this.temp.filter(function(d) {
            return d.nombre.toLowerCase().indexOf(val) !== -1 || !val;
        }); 

        this.fuerzasMusculares = temp;
    }
}