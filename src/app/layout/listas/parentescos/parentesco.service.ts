import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { CommonService } from '../../../_services';
import { Parentesco } from '.';

@Injectable()
export class ParentescoService {
    
    url = '/api/parentescos/';
    
    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get(this.url,  CommonService.getJwtHeaders());
    }

    getById(idParentesco: String): Observable<any> {
        return this.http.get(this.url + idParentesco,  CommonService.getJwtHeaders());
    }

    create(parentesco: Parentesco): Observable<any> {
        return this.http.post(this.url, parentesco, CommonService.getJwtHeaders());
    }

    update(parentesco: Parentesco): Observable<any> {
        return this.http.put(this.url + parentesco.idParentesco, parentesco,  CommonService.getJwtHeaders());
    }

    delete(idParentesco: String): Observable<any> {        
        return this.http.delete(this.url + idParentesco,  CommonService.getJwtHeaders())
    }
}