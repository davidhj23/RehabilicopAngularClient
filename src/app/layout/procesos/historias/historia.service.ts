import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { CommonService } from '../../../_services';
import { Historia } from './historia';

@Injectable()
export class HistoriaService {
    
    url = '/api/historias/';    
    
    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get(this.url,  CommonService.getJwtHeaders());
    }

    getById(id: string): Observable<any> {
        return this.http.get(this.url + id,  CommonService.getJwtHeaders());
    }    

    create(historia: Historia): Observable<any> {
        return this.http.post(this.url, historia, CommonService.getJwtHeaders());
    }

    update(historia: Historia): Observable<any> {
        return this.http.put(this.url + historia.idHistoria, historia,  CommonService.getJwtHeaders());
    }

    delete(id: string): Observable<any> {
        return this.http.delete(this.url + id,  CommonService.getJwtHeaders())
    }
}