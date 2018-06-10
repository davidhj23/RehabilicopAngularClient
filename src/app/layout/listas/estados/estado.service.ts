import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { CommonService } from '../../../_services';
import { Estado } from '.';

@Injectable()
export class EstadoService {
    
    url = '/api/estados/';
    
    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get(this.url,  CommonService.getJwtHeaders());
    }

    getById(idEstado: String): Observable<any> {
        return this.http.get(this.url + idEstado,  CommonService.getJwtHeaders());
    }

    create(estado: Estado): Observable<any> {
        return this.http.post(this.url, estado, CommonService.getJwtHeaders());
    }

    update(estado: Estado): Observable<any> {
        return this.http.put(this.url + estado.idEstado, estado,  CommonService.getJwtHeaders());
    }

    delete(idEstado: String): Observable<any> {        
        return this.http.delete(this.url + idEstado,  CommonService.getJwtHeaders())
    }
}