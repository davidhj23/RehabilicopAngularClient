import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { CommonService } from '../../../_services';
import { Dosis } from '.';

@Injectable()
export class DosisService {
    
    url = '/api/dosis/';
    
    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get(this.url,  CommonService.getJwtHeaders());
    }

    getById(idDosis: String): Observable<any> {
        return this.http.get(this.url + idDosis,  CommonService.getJwtHeaders());
    }

    create(dosis: Dosis): Observable<any> {
        return this.http.post(this.url, dosis, CommonService.getJwtHeaders());
    }

    update(dosis: Dosis): Observable<any> {
        return this.http.put(this.url + dosis.idDosis, dosis,  CommonService.getJwtHeaders());
    }

    delete(idDosis: String): Observable<any> {        
        return this.http.delete(this.url + idDosis,  CommonService.getJwtHeaders())
    }
}