import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'sidebar',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {   
    
    showMenu: string = '';

    constructor() {
        
    }

    ngOnInit() {        
    }

    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }
}