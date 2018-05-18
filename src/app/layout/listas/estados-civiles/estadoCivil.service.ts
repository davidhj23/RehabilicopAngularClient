import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { CommonService } from '../../../_services';
import { EstadoCivil } from '.';

@Injectable()
export class EstadoCivilService {
    
    url = '/api/estados-civiles/';
    
    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get(this.url,  CommonService.getJwtHeaders());
    }

    getById(id: string): Observable<any> {
        return this.http.get(this.url + id,  CommonService.getJwtHeaders());
    }

    create(estadoCivil: EstadoCivil): Observable<any> {
        return this.http.post(this.url, estadoCivil, CommonService.getJwtHeaders());
    }

    update(estadoCivil: EstadoCivil): Observable<any> {
        return this.http.put(this.url + estadoCivil.idEstadoCivil, estadoCivil,  CommonService.getJwtHeaders());
    }

    delete(id: string): Observable<any> {
        return this.http.delete(this.url + id,  CommonService.getJwtHeaders())
    }
}