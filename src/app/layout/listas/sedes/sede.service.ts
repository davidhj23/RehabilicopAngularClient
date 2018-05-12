import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { CommonService } from '../../../_services';
import { Sede } from '.';

@Injectable()
export class SedeService {
    
    url = '/api/sedes/';
    
    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get(this.url,  CommonService.getJwtHeaders());
    }

    getById(id: string): Observable<any> {
        return this.http.get(this.url + id,  CommonService.getJwtHeaders());
    }

    create(sede: Sede): Observable<any> {
        return this.http.post(this.url, sede, CommonService.getJwtHeaders());
    }

    update(sede: Sede): Observable<any> {
        return this.http.put(this.url + sede.idSede, sede,  CommonService.getJwtHeaders());
    }

    delete(id: number): Observable<any> {
        return this.http.delete(this.url + id,  CommonService.getJwtHeaders())
    }
}