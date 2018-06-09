import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { CommonService } from '../../../_services';
import { Alimentacion } from '.';

@Injectable()
export class AlimentacionService {
    
    url = '/api/alimentaciones/';
    
    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get(this.url,  CommonService.getJwtHeaders());
    }

    getById(id: string): Observable<any> {
        return this.http.get(this.url + id,  CommonService.getJwtHeaders());
    }

    create(alimentacion: Alimentacion): Observable<any> {
        return this.http.post(this.url, alimentacion, CommonService.getJwtHeaders());
    }

    update(alimentacion: Alimentacion): Observable<any> {
        return this.http.put(this.url + alimentacion.idAlimentacion, alimentacion,  CommonService.getJwtHeaders());
    }

    delete(id: string): Observable<any> {
        return this.http.delete(this.url + id,  CommonService.getJwtHeaders())
    }
}