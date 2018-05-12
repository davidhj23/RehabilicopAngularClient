import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'sidebar',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {   
    
    showSeguridad: string = '';
    showListas: string = '';

    constructor() {
        
    }

    ngOnInit() {        
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