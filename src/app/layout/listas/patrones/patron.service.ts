import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { CommonService } from '../../../_services';
import { Patron } from '.';

@Injectable()
export class PatronService {
    
    url = '/api/patrones/';
    
    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get(this.url,  CommonService.getJwtHeaders());
    }

    getById(id: string): Observable<any> {
        return this.http.get(this.url + id,  CommonService.getJwtHeaders());
    }

    create(patron: Patron): Observable<any> {
        return this.http.post(this.url, patron, CommonService.getJwtHeaders());
    }

    update(patron: Patron): Observable<any> {
        return this.http.put(this.url + patron.idPatron, patron,  CommonService.getJwtHeaders());
    }

    delete(id: string): Observable<any> {
        return this.http.delete(this.url + id,  CommonService.getJwtHeaders())
    }
}