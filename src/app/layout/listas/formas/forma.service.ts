import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { CommonService } from '../../../_services';
import { Forma } from '.';

@Injectable()
export class FormaService {
    
    url = '/api/formas/';
    
    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get(this.url,  CommonService.getJwtHeaders());
    }

    getById(idForma: String): Observable<any> {
        return this.http.get(this.url + idForma,  CommonService.getJwtHeaders());
    }

    create(forma: Forma): Observable<any> {
        return this.http.post(this.url, forma, CommonService.getJwtHeaders());
    }

    update(forma: Forma): Observable<any> {
        return this.http.put(this.url + forma.idForma, forma,  CommonService.getJwtHeaders());
    }

    delete(idForma: String): Observable<any> {        
        return this.http.delete(this.url + idForma,  CommonService.getJwtHeaders())
    }
}