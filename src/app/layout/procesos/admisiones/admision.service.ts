import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { CommonService } from '../../../_services';
import { Admision } from './admision';

@Injectable()
export class AdmisionService {
    
    url = '/api/admisiones/';    
    
    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get(this.url,  CommonService.getJwtHeaders());
    }

    getById(id: string): Observable<any> {
        return this.http.get(this.url + id,  CommonService.getJwtHeaders());
    }    

    create(admision: Admision): Observable<any> {
        return this.http.post(this.url, admision, CommonService.getJwtHeaders());
    }

    update(admision: Admision): Observable<any> {
        return this.http.put(this.url + admision.idAdmision, admision,  CommonService.getJwtHeaders());
    }

    delete(id: string): Observable<any> {
        return this.http.delete(this.url + id,  CommonService.getJwtHeaders())
    }

    getAdmisionByIdentificacionPaciente(id: string): Observable<any>{
        return this.http.get(this.url + 'paciente/' + id,  CommonService.getJwtHeaders());
    }

    getTodasAdmisionByIdentificacionPaciente(id: string): Observable<any>{
        return this.http.get(this.url + 'paciente/all/' + id,  CommonService.getJwtHeaders());
    }
}