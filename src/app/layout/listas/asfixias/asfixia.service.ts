import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { CommonService } from '../../../_services';
import { Asfixia } from '.';

@Injectable()
export class AsfixiaService {
    
    url = '/api/asfixias/';
    
    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get(this.url,  CommonService.getJwtHeaders());
    }

    getById(idAsfixia: String): Observable<any> {
        return this.http.get(this.url + idAsfixia,  CommonService.getJwtHeaders());
    }

    create(asfixia: Asfixia): Observable<any> {
        return this.http.post(this.url, asfixia, CommonService.getJwtHeaders());
    }

    update(asfixia: Asfixia): Observable<any> {
        return this.http.put(this.url + asfixia.idAsfixia, asfixia,  CommonService.getJwtHeaders());
    }

    delete(idAsfixia: String): Observable<any> {        
        return this.http.delete(this.url + idAsfixia,  CommonService.getJwtHeaders())
    }
}