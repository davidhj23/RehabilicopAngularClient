import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { CommonService } from '../../../_services';
import { SeMuestra1 } from '.';

@Injectable()
export class SeMuestra1Service {
    
    url = '/api/se-muestra1/';
    
    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get(this.url,  CommonService.getJwtHeaders());
    }

    getById(id: string): Observable<any> {
        return this.http.get(this.url + id,  CommonService.getJwtHeaders());
    }

    create(seMuestra1: SeMuestra1): Observable<any> {
        return this.http.post(this.url, seMuestra1, CommonService.getJwtHeaders());
    }

    update(seMuestra1: SeMuestra1): Observable<any> {
        return this.http.put(this.url + seMuestra1.idSeMuestra1, seMuestra1,  CommonService.getJwtHeaders());
    }

    delete(id: string): Observable<any> {
        return this.http.delete(this.url + id,  CommonService.getJwtHeaders())
    }
}