import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'sidebar',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {   
    
    showProcesos: string = '';
    showSeguridad: string = '';
    showListas: string = '';    

    constructor() {
        
    }

    ngOnInit() {        
    }

    expandProcesos(element: any) {
        if (element === this.showProcesos) {
            this.showProcesos = '0';
        } else {
            this.showProcesos = element;
        }
    }

    expandSeguridad(element: any) {
        if (element === this.showSeguridad) {
            this.showSeguridad = '0';
        } else {
            this.showSeguridad = element;
        }
    }

    expandListas(element: any) {
        if (element === this.showListas) {
            this.showListas = '0';
        } else {
            this.showListas = element;
        }
    }
}