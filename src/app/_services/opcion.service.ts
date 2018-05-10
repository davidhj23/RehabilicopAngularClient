import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../_models/index';
import { CommonService } from '../_services/index';
import { Observable } from 'rxjs/Observable';
import { Opcion } from '../_models/opcion';

@Injectable()
export class OpcionService {
    
    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get('/api/opciones/',  CommonService.getJwtHeaders());
    }

    getById(id: string): Observable<any> {
        return this.http.get('/api/opciones/' + id,  CommonService.getJwtHeaders());
    }

    create(opcion: Opcion): Observable<any> {
        return this.http.post('/api/opciones/', opcion, CommonService.getJwtHeaders());
    }

    update(opcion: Opcion): Observable<any> {
        return this.http.put('/api/opciones/' + opcion.idOpcion, opcion,  CommonService.getJwtHeaders());
    }

    delete(id: number): Observable<any> {
        return this.http.delete('/api/opciones/' + id,  CommonService.getJwtHeaders())
    }
}