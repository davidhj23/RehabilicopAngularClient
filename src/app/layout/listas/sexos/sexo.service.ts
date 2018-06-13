import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { CommonService } from '../../../_services';
import { Sexo } from '.';

@Injectable()
export class SexoService {
    
    url = '/api/sexos/';
    
    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get(this.url,  CommonService.getJwtHeaders());
    }

    getById(idSexo: String): Observable<any> {
        return this.http.get(this.url + idSexo,  CommonService.getJwtHeaders());
    }

    create(sexo: Sexo): Observable<any> {
        return this.http.post(this.url, sexo, CommonService.getJwtHeaders());
    }

    update(sexo: Sexo): Observable<any> {
        return this.http.put(this.url + sexo.idSexo, sexo,  CommonService.getJwtHeaders());
    }

    delete(idSexo: String): Observable<any> {        
        return this.http.delete(this.url + idSexo,  CommonService.getJwtHeaders())
    }
}