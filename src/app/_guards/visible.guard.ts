import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable()
export class VisibleGuard implements CanActivate {

    constructor() { }

    canActivate() {
        if (localStorage.getItem('jwtToken')) {            
            return true;
        }
        return false;
    }
}