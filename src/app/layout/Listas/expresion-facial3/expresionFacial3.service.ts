import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { CommonService } from '../../../_services';
import { ExpresionFacial3 } from '.';

@Injectable()
export class ExpresionFacial3Service {
    
    url = '/api/expresion-facial3/';
    
    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get(this.url,  CommonService.getJwtHeaders());
    }

    getById(id: string): Observable<any> {
        return this.http.get(this.url + id,  CommonService.getJwtHeaders());
    }

    create(expresionFacial3: ExpresionFacial3): Observable<any> {
        return this.http.post(this.url, expresionFacial3, CommonService.getJwtHeaders());
    }

    update(expresionFacial3: ExpresionFacial3): Observable<any> {
        return this.http.put(this.url + expresionFacial3.idExpresionFacial3, expresionFacial3,  CommonService.getJwtHeaders());
    }

    delete(id: string): Observable<any> {
        return this.http.delete(this.url + id,  CommonService.getJwtHeaders())
    }
}