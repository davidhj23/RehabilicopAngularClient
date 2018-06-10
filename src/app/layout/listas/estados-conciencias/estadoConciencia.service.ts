import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { CommonService } from '../../../_services';
import { EstadoConciencia } from '.';

@Injectable()
export class EstadoConcienciaService {
    
    url = '/api/estados-conciencias/';
    
    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get(this.url,  CommonService.getJwtHeaders());
    }

    getById(id: string): Observable<any> {
        return this.http.get(this.url + id,  CommonService.getJwtHeaders());
    }

    create(estadoConciencia: EstadoConciencia): Observable<any> {
        return this.http.post(this.url, estadoConciencia, CommonService.getJwtHeaders());
    }

    update(estadoConciencia: EstadoConciencia): Observable<any> {
        return this.http.put(this.url + estadoConciencia.idEstadoConciencia, estadoConciencia,  CommonService.getJwtHeaders());
    }

    delete(id: string): Observable<any> {
        return this.http.delete(this.url + id,  CommonService.getJwtHeaders())
    }
}