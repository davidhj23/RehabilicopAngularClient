import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { CommonService } from '../../../_services';
import { ExpresionFacial2 } from '.';

@Injectable()
export class ExpresionFacial2Service {
    
    url = '/api/expresion-facial2/';
    
    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get(this.url,  CommonService.getJwtHeaders());
    }

    getById(id: string): Observable<any> {
        return this.http.get(this.url + id,  CommonService.getJwtHeaders());
    }

    create(expresionFacial2: ExpresionFacial2): Observable<any> {
        return this.http.post(this.url, expresionFacial2, CommonService.getJwtHeaders());
    }

    update(expresionFacial2: ExpresionFacial2): Observable<any> {
        return this.http.put(this.url + expresionFacial2.idExpresionFacial2, expresionFacial2,  CommonService.getJwtHeaders());
    }

    delete(id: string): Observable<any> {
        return this.http.delete(this.url + id,  CommonService.getJwtHeaders())
    }
}