import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { CommonService } from '../../../_services';
import { Alucinacion } from '.';

@Injectable()
export class AlucinacionService {
    
    url = '/api/alucinaciones/';
    
    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get(this.url,  CommonService.getJwtHeaders());
    }

    getById(idAlucinacion: String): Observable<any> {
        return this.http.get(this.url + idAlucinacion,  CommonService.getJwtHeaders());
    }

    create(alucinacion: Alucinacion): Observable<any> {
        return this.http.post(this.url, alucinacion, CommonService.getJwtHeaders());
    }

    update(alucinacion: Alucinacion): Observable<any> {
        return this.http.put(this.url + alucinacion.idAlucinacion, alucinacion,  CommonService.getJwtHeaders());
    }

    delete(idAlucinacion: String): Observable<any> {        
        return this.http.delete(this.url + idAlucinacion,  CommonService.getJwtHeaders())
    }
}