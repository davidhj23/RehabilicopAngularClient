import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { CommonService } from '../../../_services';
import { Organo } from '.';

@Injectable()
export class OrganoService {
    
    url = '/api/organos/';
    
    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get(this.url,  CommonService.getJwtHeaders());
    }

    getById(idOrgano: String): Observable<any> {
        return this.http.get(this.url + idOrgano,  CommonService.getJwtHeaders());
    }

    create(organo: Organo): Observable<any> {
        return this.http.post(this.url, organo, CommonService.getJwtHeaders());
    }

    update(organo: Organo): Observable<any> {
        return this.http.put(this.url + organo.idOrgano, organo,  CommonService.getJwtHeaders());
    }

    delete(idOrgano: String): Observable<any> {        
        return this.http.delete(this.url + idOrgano,  CommonService.getJwtHeaders())
    }
}