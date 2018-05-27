import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { CommonService } from '../../../_services';
import { Movilidad } from '.';

@Injectable()
export class MovilidadService {
    
    url = '/api/movilidades/';
    
    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get(this.url,  CommonService.getJwtHeaders());
    }

    getById(idMovilidad: String): Observable<any> {
        return this.http.get(this.url + idMovilidad,  CommonService.getJwtHeaders());
    }

    create(movilidad: Movilidad): Observable<any> {
        return this.http.post(this.url, movilidad, CommonService.getJwtHeaders());
    }

    update(movilidad: Movilidad): Observable<any> {
        return this.http.put(this.url + movilidad.idMovilidad, movilidad,  CommonService.getJwtHeaders());
    }

    delete(idMovilidad: String): Observable<any> {        
        return this.http.delete(this.url + idMovilidad,  CommonService.getJwtHeaders())
    }
}