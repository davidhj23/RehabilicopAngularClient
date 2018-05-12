import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { CommonService } from '../_services/index';
import { Observable } from 'rxjs/Observable';
import { Sede } from '../_models/sede';

@Injectable()
export class SedeService {
    
    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get('/api/sedes/',  CommonService.getJwtHeaders());
    }

    getById(id: string): Observable<any> {
        return this.http.get('/api/sedes/' + id,  CommonService.getJwtHeaders());
    }

    create(sede: Sede): Observable<any> {
        console.log(sede)
        return this.http.post('/api/sedes/', sede, CommonService.getJwtHeaders());
    }

    update(sede: Sede): Observable<any> {
        return this.http.put('/api/sedes/' + sede.idSede, sede,  CommonService.getJwtHeaders());
    }

    delete(id: number): Observable<any> {
        return this.http.delete('/api/sedes/' + id,  CommonService.getJwtHeaders())
    }
}