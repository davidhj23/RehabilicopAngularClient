import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { CommonService } from '../../../_services';
import { Atencion } from '.';

@Injectable()
export class AtencionService {
    
    url = '/api/atenciones/';
    
    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get(this.url,  CommonService.getJwtHeaders());
    }

    getById(idAtencion: String): Observable<any> {
        return this.http.get(this.url + idAtencion,  CommonService.getJwtHeaders());
    }

    create(atencion: Atencion): Observable<any> {
        return this.http.post(this.url, atencion, CommonService.getJwtHeaders());
    }

    update(atencion: Atencion): Observable<any> {
        return this.http.put(this.url + atencion.idAtencion, atencion,  CommonService.getJwtHeaders());
    }

    delete(idAtencion: String): Observable<any> {        
        return this.http.delete(this.url + idAtencion,  CommonService.getJwtHeaders())
    }
}