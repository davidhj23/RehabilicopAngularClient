import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { CommonService } from '../../../_services';
import { Memoria2 } from '.';

@Injectable()
export class Memoria2Service {
    
    url = '/api/memoria2s/';
    
    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get(this.url,  CommonService.getJwtHeaders());
    }

    getById(idMemoria2: String): Observable<any> {
        return this.http.get(this.url + idMemoria2,  CommonService.getJwtHeaders());
    }

    create(memoria2: Memoria2): Observable<any> {
        return this.http.post(this.url, memoria2, CommonService.getJwtHeaders());
    }

    update(memoria2: Memoria2): Observable<any> {
        return this.http.put(this.url + memoria2.idMemoria2, memoria2,  CommonService.getJwtHeaders());
    }

    delete(idMemoria2: String): Observable<any> {        
        return this.http.delete(this.url + idMemoria2,  CommonService.getJwtHeaders())
    }
}