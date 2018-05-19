import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { CommonService } from '../../../_services';
import { TonoVoz } from '.';

@Injectable()
export class TonoVozService {
    
    url = '/api/tonos-voz/';
    
    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get(this.url,  CommonService.getJwtHeaders());
    }

    getById(id: string): Observable<any> {
        return this.http.get(this.url + id,  CommonService.getJwtHeaders());
    }

    create(tonoVoz: TonoVoz): Observable<any> {
        return this.http.post(this.url, tonoVoz, CommonService.getJwtHeaders());
    }

    update(tonoVoz: TonoVoz): Observable<any> {
        return this.http.put(this.url + tonoVoz.idTonoVoz, tonoVoz,  CommonService.getJwtHeaders());
    }

    delete(id: string): Observable<any> {
        return this.http.delete(this.url + id,  CommonService.getJwtHeaders())
    }
}