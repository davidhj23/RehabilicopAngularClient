import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id.toString(),
    selector: 'layout',
    templateUrl: 'layout.component.html'
})

export class LayoutComponent implements OnInit {    
    isCollapsed = false; 

    constructor() {                
    }

    ngOnInit() {          
    }

    onCollapse(event: any) {
        this.isCollapsed = !this.isCollapsed;
    }
}