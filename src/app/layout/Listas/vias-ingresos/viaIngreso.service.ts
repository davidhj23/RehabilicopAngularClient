import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { CommonService } from '../../../_services';
import { ViaIngreso } from '.';

@Injectable()
export class ViaIngresoService {
    
    url = '/api/vias-ingresos/';
    
    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get(this.url,  CommonService.getJwtHeaders());
    }

    getById(id: string): Observable<any> {
        return this.http.get(this.url + id,  CommonService.getJwtHeaders());
    }

    create(viaIngreso: ViaIngreso): Observable<any> {
        return this.http.post(this.url, viaIngreso, CommonService.getJwtHeaders());
    }

    update(viaIngreso: ViaIngreso): Observable<any> {
        return this.http.put(this.url + viaIngreso.idViaIngreso, viaIngreso,  CommonService.getJwtHeaders());
    }

    delete(id: string): Observable<any> {
        return this.http.delete(this.url + id,  CommonService.getJwtHeaders())
    }
}