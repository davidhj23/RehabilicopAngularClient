import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { CommonService } from '../../../_services';
import { Aseguradora } from '.';

@Injectable()
export class AseguradoraService {
    
    url = '/api/aseguradoras/';
    
    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get(this.url,  CommonService.getJwtHeaders());
    }

    getById(idAseguradora: String): Observable<any> {
        return this.http.get(this.url + idAseguradora,  CommonService.getJwtHeaders());
    }

    create(aseguradora: Aseguradora): Observable<any> {
        return this.http.post(this.url, aseguradora, CommonService.getJwtHeaders());
    }

    update(aseguradora: Aseguradora): Observable<any> {
        return this.http.put(this.url + aseguradora.idAseguradora, aseguradora,  CommonService.getJwtHeaders());
    }

    delete(idAseguradora: String): Observable<any> {        
        return this.http.delete(this.url + idAseguradora,  CommonService.getJwtHeaders())
    }

    getAseguradorasAuditor(): Observable<any> {
        return this.http.get(this.url + 'aseguradoras-auditor/', CommonService.getJwtHeaders());
    }
}