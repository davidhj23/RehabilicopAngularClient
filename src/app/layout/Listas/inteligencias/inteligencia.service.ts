import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { CommonService } from '../../../_services';
import { Inteligencia } from '.';

@Injectable()
export class InteligenciaService {
    
    url = '/api/inteligencias/';
    
    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get(this.url,  CommonService.getJwtHeaders());
    }

    getById(idInteligencia: String): Observable<any> {
        return this.http.get(this.url + idInteligencia,  CommonService.getJwtHeaders());
    }

    create(inteligencia: Inteligencia): Observable<any> {
        return this.http.post(this.url, inteligencia, CommonService.getJwtHeaders());
    }

    update(inteligencia: Inteligencia): Observable<any> {
        return this.http.put(this.url + inteligencia.idInteligencia, inteligencia,  CommonService.getJwtHeaders());
    }

    delete(idInteligencia: String): Observable<any> {        
        return this.http.delete(this.url + idInteligencia,  CommonService.getJwtHeaders())
    }
}