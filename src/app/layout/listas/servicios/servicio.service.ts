import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { CommonService } from '../../../_services';
import { Servicio } from '.';

@Injectable()
export class ServicioService {
    
    url = '/api/servicios/';
    
    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get(this.url,  CommonService.getJwtHeaders());
    }

    getById(id: string): Observable<any> {
        return this.http.get(this.url + id,  CommonService.getJwtHeaders());
    }

    create(servicio: Servicio): Observable<any> {
        return this.http.post(this.url, servicio, CommonService.getJwtHeaders());
    }

    update(servicio: Servicio): Observable<any> {
        return this.http.put(this.url + servicio.idServicio, servicio,  CommonService.getJwtHeaders());
    }

    delete(id: string): Observable<any> {
        return this.http.delete(this.url + id,  CommonService.getJwtHeaders())
    }
}