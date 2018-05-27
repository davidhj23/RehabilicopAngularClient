import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { CommonService } from '../../../_services';
import { Humor } from '.';

@Injectable()
export class HumorService {
    
    url = '/api/humores/';
    
    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get(this.url,  CommonService.getJwtHeaders());
    }

    getById(idHumor: String): Observable<any> {
        return this.http.get(this.url + idHumor,  CommonService.getJwtHeaders());
    }

    create(humor: Humor): Observable<any> {
        return this.http.post(this.url, humor, CommonService.getJwtHeaders());
    }

    update(humor: Humor): Observable<any> {
        return this.http.put(this.url + humor.idHumor, humor,  CommonService.getJwtHeaders());
    }

    delete(idHumor: String): Observable<any> {        
        return this.http.delete(this.url + idHumor,  CommonService.getJwtHeaders())
    }
}