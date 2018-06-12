import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { CommonService } from '../../../_services';
import { Parentezco } from '.';

@Injectable()
export class ParentezcoService {
    
    url = '/api/parentezcos/';
    
    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get(this.url,  CommonService.getJwtHeaders());
    }

    getById(idParentezco: String): Observable<any> {
        return this.http.get(this.url + idParentezco,  CommonService.getJwtHeaders());
    }

    create(parentezco: Parentezco): Observable<any> {
        return this.http.post(this.url, parentezco, CommonService.getJwtHeaders());
    }

    update(parentezco: Parentezco): Observable<any> {
        return this.http.put(this.url + parentezco.idParentezco, parentezco,  CommonService.getJwtHeaders());
    }

    delete(idParentezco: String): Observable<any> {        
        return this.http.delete(this.url + idParentezco,  CommonService.getJwtHeaders())
    }
}