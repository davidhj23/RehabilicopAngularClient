import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { CommonService } from '../../../_services';
import { TipoEntidad } from '.';

@Injectable()
export class TipoEntidadService {
    
    url = '/api/tipos-entidades/';
    
    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get(this.url,  CommonService.getJwtHeaders());
    }

    getById(id: string): Observable<any> {
        return this.http.get(this.url + id,  CommonService.getJwtHeaders());
    }

    create(tipoEntidad: TipoEntidad): Observable<any> {
        return this.http.post(this.url, tipoEntidad, CommonService.getJwtHeaders());
    }

    update(tipoEntidad: TipoEntidad): Observable<any> {
        return this.http.put(this.url + tipoEntidad.idTipoEntidad, tipoEntidad,  CommonService.getJwtHeaders());
    }

    delete(id: string): Observable<any> {
        return this.http.delete(this.url + id,  CommonService.getJwtHeaders())
    }
}