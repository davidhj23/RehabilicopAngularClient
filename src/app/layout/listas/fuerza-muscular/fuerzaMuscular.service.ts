import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { CommonService } from '../../../_services';
import { FuerzaMuscular } from '.';

@Injectable()
export class FuerzaMuscularService {
    
    url = '/api/fuerza-muscular/';
    
    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get(this.url,  CommonService.getJwtHeaders());
    }

    getById(id: string): Observable<any> {
        return this.http.get(this.url + id,  CommonService.getJwtHeaders());
    }

    create(fuerzaMuscular: FuerzaMuscular): Observable<any> {
        return this.http.post(this.url, fuerzaMuscular, CommonService.getJwtHeaders());
    }

    update(fuerzaMuscular: FuerzaMuscular): Observable<any> {
        return this.http.put(this.url + fuerzaMuscular.idFuerzaMuscular, fuerzaMuscular,  CommonService.getJwtHeaders());
    }

    delete(id: string): Observable<any> {
        return this.http.delete(this.url + id,  CommonService.getJwtHeaders())
    }
}