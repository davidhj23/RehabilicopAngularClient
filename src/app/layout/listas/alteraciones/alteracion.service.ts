import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { CommonService } from '../../../_services';
import { Alteracion } from '.';

@Injectable()
export class AlteracionService {
    
    url = '/api/alteraciones/';
    
    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get(this.url,  CommonService.getJwtHeaders());
    }

    getById(id: string): Observable<any> {
        return this.http.get(this.url + id,  CommonService.getJwtHeaders());
    }

    create(alteracion: Alteracion): Observable<any> {
        return this.http.post(this.url, alteracion, CommonService.getJwtHeaders());
    }

    update(alteracion: Alteracion): Observable<any> {
        return this.http.put(this.url + alteracion.idAlteracion, alteracion,  CommonService.getJwtHeaders());
    }

    delete(id: string): Observable<any> {
        return this.http.delete(this.url + id,  CommonService.getJwtHeaders())
    }
}