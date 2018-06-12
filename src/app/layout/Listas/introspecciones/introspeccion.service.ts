import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { CommonService } from '../../../_services';
import { Introspeccion } from '.';

@Injectable()
export class IntrospeccionService {
    
    url = '/api/introspecciones/';
    
    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get(this.url,  CommonService.getJwtHeaders());
    }

    getById(idIntrospeccion: String): Observable<any> {
        return this.http.get(this.url + idIntrospeccion,  CommonService.getJwtHeaders());
    }

    create(introspeccion: Introspeccion): Observable<any> {
        return this.http.post(this.url, introspeccion, CommonService.getJwtHeaders());
    }

    update(introspeccion: Introspeccion): Observable<any> {
        return this.http.put(this.url + introspeccion.idIntrospeccion, introspeccion,  CommonService.getJwtHeaders());
    }

    delete(idIntrospeccion: String): Observable<any> {        
        return this.http.delete(this.url + idIntrospeccion,  CommonService.getJwtHeaders())
    }
}