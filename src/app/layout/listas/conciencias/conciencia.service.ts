import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { CommonService } from '../../../_services';
import { Conciencia } from '.';

@Injectable()
export class ConcienciaService {
    
    url = '/api/conciencias/';
    
    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get(this.url,  CommonService.getJwtHeaders());
    }

    getById(idConciencia: String): Observable<any> {
        return this.http.get(this.url + idConciencia,  CommonService.getJwtHeaders());
    }

    create(conciencia: Conciencia): Observable<any> {
        return this.http.post(this.url, conciencia, CommonService.getJwtHeaders());
    }

    update(conciencia: Conciencia): Observable<any> {
        return this.http.put(this.url + conciencia.idConciencia, conciencia,  CommonService.getJwtHeaders());
    }

    delete(idConciencia: String): Observable<any> {        
        return this.http.delete(this.url + idConciencia,  CommonService.getJwtHeaders())
    }
}