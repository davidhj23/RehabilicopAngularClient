import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { CommonService } from '../../../_services';
import { Equipo } from '.';

@Injectable()
export class EquipoService {
    
    url = '/api/equipos/';
    
    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get(this.url,  CommonService.getJwtHeaders());
    }

    getById(idEquipo: String): Observable<any> {
        return this.http.get(this.url + idEquipo,  CommonService.getJwtHeaders());
    }

    create(equipo: Equipo): Observable<any> {
        return this.http.post(this.url, equipo, CommonService.getJwtHeaders());
    }

    update(equipo: Equipo): Observable<any> {
        return this.http.put(this.url + equipo.idEquipo, equipo,  CommonService.getJwtHeaders());
    }

    delete(idEquipo: String): Observable<any> {        
        return this.http.delete(this.url + idEquipo,  CommonService.getJwtHeaders())
    }
}