import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { CommonService } from '../../../_services';
import { Apariencia } from '.';

@Injectable()
export class AparienciaService {
    
    url = '/api/apariencias/';
    
    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get(this.url,  CommonService.getJwtHeaders());
    }

    getById(idApariencia: String): Observable<any> {
        return this.http.get(this.url + idApariencia,  CommonService.getJwtHeaders());
    }

    create(apariencia: Apariencia): Observable<any> {
        return this.http.post(this.url, apariencia, CommonService.getJwtHeaders());
    }

    update(apariencia: Apariencia): Observable<any> {
        return this.http.put(this.url + apariencia.idApariencia, apariencia,  CommonService.getJwtHeaders());
    }

    delete(idApariencia: String): Observable<any> {        
        return this.http.delete(this.url + idApariencia,  CommonService.getJwtHeaders())
    }
}