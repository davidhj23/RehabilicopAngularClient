import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { CommonService } from '../../../_services';
import { TiempoUso } from '.';

@Injectable()
export class TiempoUsoService {
    
    url = '/api/tiempos-de-usos/';
    
    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get(this.url,  CommonService.getJwtHeaders());
    }

    getById(id: string): Observable<any> {
        return this.http.get(this.url + id,  CommonService.getJwtHeaders());
    }

    create(tiempoUso: TiempoUso): Observable<any> {
        return this.http.post(this.url, tiempoUso, CommonService.getJwtHeaders());
    }

    update(tiempoUso: TiempoUso): Observable<any> {
        return this.http.put(this.url + tiempoUso.idTiempoUso, tiempoUso,  CommonService.getJwtHeaders());
    }

    delete(id: string): Observable<any> {
        return this.http.delete(this.url + id,  CommonService.getJwtHeaders())
    }
}