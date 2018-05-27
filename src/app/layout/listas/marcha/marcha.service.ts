import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { CommonService } from '../../../_services';
import { Marcha } from '.';

@Injectable()
export class MarchaService {
    
    url = '/api/marchas/';
    
    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get(this.url,  CommonService.getJwtHeaders());
    }

    getById(idMarcha: String): Observable<any> {
        return this.http.get(this.url + idMarcha,  CommonService.getJwtHeaders());
    }

    create(marcha: Marcha): Observable<any> {
        return this.http.post(this.url, marcha, CommonService.getJwtHeaders());
    }

    update(marcha: Marcha): Observable<any> {
        return this.http.put(this.url + marcha.idMarcha, marcha,  CommonService.getJwtHeaders());
    }

    delete(idMarcha: String): Observable<any> {        
        return this.http.delete(this.url + idMarcha,  CommonService.getJwtHeaders())
    }
}