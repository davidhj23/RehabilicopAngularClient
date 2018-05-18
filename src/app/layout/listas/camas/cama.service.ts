import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { CommonService } from '../../../_services';
import { Cama } from '.';

@Injectable()
export class CamaService {
    
    url = '/api/camas/';
    
    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get(this.url,  CommonService.getJwtHeaders());
    }

    getById(idCama: String): Observable<any> {
        return this.http.get(this.url + idCama,  CommonService.getJwtHeaders());
    }

    create(cama: Cama): Observable<any> {
        return this.http.post(this.url, cama, CommonService.getJwtHeaders());
    }

    update(cama: Cama): Observable<any> {
        return this.http.put(this.url + cama.idCama, cama,  CommonService.getJwtHeaders());
    }

    delete(idCama: String): Observable<any> {        
        return this.http.delete(this.url + idCama,  CommonService.getJwtHeaders())
    }
}