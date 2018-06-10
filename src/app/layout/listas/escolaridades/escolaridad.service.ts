import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { CommonService } from '../../../_services';
import { Escolaridad } from '.';

@Injectable()
export class EscolaridadService {
    
    url = '/api/escolaridades/';
    
    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get(this.url,  CommonService.getJwtHeaders());
    }

    getById(id: string): Observable<any> {
        return this.http.get(this.url + id,  CommonService.getJwtHeaders());
    }

    create(escolaridad: Escolaridad): Observable<any> {
        return this.http.post(this.url, escolaridad, CommonService.getJwtHeaders());
    }

    update(escolaridad: Escolaridad): Observable<any> {
        return this.http.put(this.url + escolaridad.idEscolaridad, escolaridad,  CommonService.getJwtHeaders());
    }

    delete(id: string): Observable<any> {
        return this.http.delete(this.url + id,  CommonService.getJwtHeaders())
    }
}