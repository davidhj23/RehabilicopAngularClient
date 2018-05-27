import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { CommonService } from '../../../_services';
import { Memoria } from '.';

@Injectable()
export class MemoriaService {
    
    url = '/api/memorias/';
    
    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get(this.url,  CommonService.getJwtHeaders());
    }

    getById(idMemoria: String): Observable<any> {
        return this.http.get(this.url + idMemoria,  CommonService.getJwtHeaders());
    }

    create(memoria: Memoria): Observable<any> {
        return this.http.post(this.url, memoria, CommonService.getJwtHeaders());
    }

    update(memoria: Memoria): Observable<any> {
        return this.http.put(this.url + memoria.idMemoria, memoria,  CommonService.getJwtHeaders());
    }

    delete(idMemoria: String): Observable<any> {        
        return this.http.delete(this.url + idMemoria,  CommonService.getJwtHeaders())
    }
}