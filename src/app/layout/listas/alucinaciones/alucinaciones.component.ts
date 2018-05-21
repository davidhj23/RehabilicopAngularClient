import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Alucinacion } from './alucinacion';
import { AlucinacionService } from './alucinacion.service';

@Component({
    selector: 'alucinaciones',
    templateUrl: 'alucinaciones.component.html',
})

export class AlucinacionesComponent implements OnInit {   
    
    alucinaciones: Alucinacion[] = [];
    temp: Alucinacion[] = [];

    alucinacion: Alucinacion = new Alucinacion();
    rowsOnPage = 5;

    model: any = {};
    areErrors = false;
    errores: any[] = [];
    loading = false;        

    constructor(
        private alucinacionService: AlucinacionService,
        private router: Router,
        private ngbModal: NgbModal) {
        let self = this;
    }

    ngOnInit() {        
        this.loadAllAlucinacions();        
    }

    private loadAllAlucinacions() {     
        this.showLoading(true);   
        this.alucinacionService.getAll().subscribe(
            alucinaciones => { 
                this.alucinaciones = alucinaciones; 
                this.temp = this.alucinaciones;
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
            this.alucinacionService.create(this.model)
                .subscribe(
                    data => {                        
                        this.clearModel();
                        this.loadAllAlucinacions();
                        this.showLoading(false);
                    },
                    error => {                        
                        this.errores = error.error;             
                        this.showErrors();
                        this.showLoading(false);
                    });
        }else{        
            this.model.idAlucinacion = this.model.hiddenId;            
            this.alucinacionService.update(this.model)
                .subscribe(
                    data => {
                        this.clearModel();
                        this.loadAllAlucinacions();
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
        this.model.hiddenId = model.idAlucinacion;        
        this.model.nombre = model.nombre;
    }

    delete(idAlucinacion: string, content: any) {   
        this.clearAndcloseErrors();   
        this.ngbModal.open(content).result.then((result) => {
            this.showLoading(true);
            this.alucinacionService.delete(idAlucinacion)
                .subscribe(data => {                    
                    this.loadAllAlucinacions();                    
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
        this.model.idAlucinacion = '';        
        this.model.nombre = '';
    }

    filtrarTabla(event: any) { 
        const val = event.target.value.toLowerCase();

        // filter our data
        const temp = this.temp.filter(function(d) {
            return d.nombre.toLowerCase().indexOf(val) !== -1 || !val;
        }); 

        this.alucinaciones = temp;
    }
}