import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id.toString(),
    selector: 'home',
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {    
    isCollapsed = false; 

    constructor() {                
    }

    ngOnInit() {          
    }

    onCollapse(event: any) {
        this.isCollapsed = !this.isCollapsed;
    }
}