import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { CommonService } from '../../../_services';
import { OrdenMedica } from './ordenMedica';

@Injectable()
export class OrdenMedicaService {
    
    url = '/api/orden-medica/';    
    
    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get(this.url,  CommonService.getJwtHeaders());
    }

    getById(idOrdenMedica: String): Observable<any> {
        return this.http.get(this.url + idOrdenMedica,  CommonService.getJwtHeaders());
    }
    
    getByPaciente(idPaciente: String): Observable<any> {
        return this.http.get(this.url + idPaciente,  CommonService.getJwtHeaders());
    }

    create(ordenMedica: OrdenMedica): Observable<any> {
        return this.http.post(this.url, ordenMedica, CommonService.getJwtHeaders());
    }

    /*update(dosis: Dosis): Observable<any> {
        return this.http.put(this.url + dosis.idDosis, dosis,  CommonService.getJwtHeaders());
    }

    delete(idDosis: String): Observable<any> {        
        return this.http.delete(this.url + idDosis,  CommonService.getJwtHeaders())
    }*/
}