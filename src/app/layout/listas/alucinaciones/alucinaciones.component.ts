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
    model: any = {};
    modelToEdit: any = {};

    loading = false;        
    rowsOnPage = 5;
    
    areErrors = false;
    errores: any[] = [];   
    areEditErrors = false;
    editErrores: any[] = [];       

    constructor(
        private alucinacionService: AlucinacionService,
        private router: Router,
        private ngbModal: NgbModal) {
        let self = this;
    }

    ngOnInit() {        
        this.loadAllAlucinaciones();        
    }

    private loadAllAlucinaciones() {     
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

    filtrarTabla(event: any) { 
        const val = event.target.value.toLowerCase();

        // filter our data
        const temp = this.temp.filter(function(d) {
            return d.nombre.toLowerCase().indexOf(val) !== -1 || !val;
        }); 

        this.alucinaciones = temp;
    }

    create() {
        if(!this.validateCreate()) return;

        this.showLoading(true);    
        this.alucinacionService.create(this.model)
            .subscribe(
                data => {                        
                    this.clearModel();
                    this.loadAllAlucinaciones();
                    this.showLoading(false);
                },
                error => {                        
                    this.errores = error.error;             
                    this.showErrors();
                    this.showLoading(false);
                });         
    }
    
    validateCreate(){
        let areErrors = false;
        this.clearAndcloseErrors();        

        if(this.model.nombre == undefined || this.model.nombre == ''){
            this.errores.push({ message: 'Nombre obligatorio'});
            areErrors = true;
        }

        if(areErrors){
            this.showErrors();
            return false;
        }

        return true;
    }

    edit(model: any, editContent: any) {            
        this.modelToEdit.idAlucionacion = model.idAlucionacion;     
        this.modelToEdit.nombre = model.nombre;     

        this.ngbModal.open(editContent).result.then((result) => {
            
            this.showLoading(true);      
            if(this.validateEdit()){                                               
                this.alucinacionService.update(this.modelToEdit)
                    .subscribe(
                        data => {
                            this.clearModel();
                            this.loadAllAlucinaciones();
                            this.showLoading(false);
                        },
                        error => {
                            this.editErrores = error.error;             
                            this.showErrors();
                            this.showLoading(false);
                        });     
            }else{                
                this.edit(this.modelToEdit, editContent);
            }
        }, (reason) => {  
            this.clearAndcloseErrors();                      
        });
    }

    validateEdit(){
        let areEditErrors = false;        
        this.clearAndcloseErrors();        
        
        if(this.modelToEdit.nombre == undefined || this.modelToEdit.nombre == ''){
            this.editErrores.push({ message: 'Nombre obligatorio'});
            areEditErrors = true;
        }
        
        if(areEditErrors){
            this.showEditErrors();
            return false;
        }

        return true;
    }

    delete(idAlucinacion: string, content: any) {   
        this.clearAndcloseErrors();   
        this.ngbModal.open(content).result.then((result) => {
            this.showLoading(true);
            this.alucinacionService.delete(idAlucinacion)
                .subscribe(data => {                    
                    this.loadAllAlucinaciones();                    
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

    showEditErrors(){           
        this.areEditErrors = true;        
        this.showLoading(false);
        
        setTimeout(function() {
            this.clearAndcloseErrors();
        }.bind(this), 10000); 
    }

    clearAndcloseErrors(){
        this.errores = [];
        this.areErrors = false;
        this.editErrores = [];
        this.areEditErrors = false;                            
    }

    clearModel(){        
        this.model.idAlucinacion = '';        
        this.model.nombre = '';
        this.modelToEdit.idAlucionacion = '';
        this.modelToEdit.nombre = '';
    }
}