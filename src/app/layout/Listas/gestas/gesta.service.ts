import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { CommonService } from '../../../_services';
import { Gesta } from '.';

@Injectable()
export class GestaService {
    
    url = '/api/gestas/';
    
    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get(this.url,  CommonService.getJwtHeaders());
    }

    getById(idGesta: String): Observable<any> {
        return this.http.get(this.url + idGesta,  CommonService.getJwtHeaders());
    }

    create(gesta: Gesta): Observable<any> {
        return this.http.post(this.url, gesta, CommonService.getJwtHeaders());
    }

    update(gesta: Gesta): Observable<any> {
        return this.http.put(this.url + gesta.idGesta, gesta,  CommonService.getJwtHeaders());
    }

    delete(idGesta: String): Observable<any> {        
        return this.http.delete(this.url + idGesta,  CommonService.getJwtHeaders())
    }
}