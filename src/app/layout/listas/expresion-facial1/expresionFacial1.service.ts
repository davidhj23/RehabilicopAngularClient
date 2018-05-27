import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { CommonService } from '../../../_services';
import { ExpresionFacial1 } from '.';

@Injectable()
export class ExpresionFacial1Service {
    
    url = '/api/expresion-facial1/';
    
    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get(this.url,  CommonService.getJwtHeaders());
    }

    getById(id: string): Observable<any> {
        return this.http.get(this.url + id,  CommonService.getJwtHeaders());
    }

    create(expresionFacial1: ExpresionFacial1): Observable<any> {
        return this.http.post(this.url, expresionFacial1, CommonService.getJwtHeaders());
    }

    update(expresionFacial1: ExpresionFacial1): Observable<any> {
        return this.http.put(this.url + expresionFacial1.idExpresionFacial1, expresionFacial1,  CommonService.getJwtHeaders());
    }

    delete(id: string): Observable<any> {
        return this.http.delete(this.url + id,  CommonService.getJwtHeaders())
    }
}