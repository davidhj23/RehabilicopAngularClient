import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CommonService } from '../../../_services';
import { Opcion } from '.';

@Injectable()
export class OpcionService {
    
    url = '/api/opciones/';

    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get(this.url,  CommonService.getJwtHeaders());
    }

    getById(id: string): Observable<any> {
        return this.http.get(this.url + id,  CommonService.getJwtHeaders());
    }

    create(opcion: Opcion): Observable<any> {
        return this.http.post(this.url, opcion, CommonService.getJwtHeaders());
    }

    update(opcion: Opcion): Observable<any> {
        return this.http.put(this.url + opcion.idOpcion, opcion,  CommonService.getJwtHeaders());
    }

    delete(id: number): Observable<any> {
        return this.http.delete(this.url + id,  CommonService.getJwtHeaders())
    }
}