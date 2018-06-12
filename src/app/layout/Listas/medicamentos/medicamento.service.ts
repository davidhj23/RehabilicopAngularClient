import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { CommonService } from '../../../_services';
import { Medicamento } from '.';

@Injectable()
export class MedicamentoService {
    
    url = '/api/medicamentos/';
    
    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get(this.url,  CommonService.getJwtHeaders());
    }

    getById(idMedicamento: String): Observable<any> {
        return this.http.get(this.url + idMedicamento,  CommonService.getJwtHeaders());
    }

    create(medicamento: Medicamento): Observable<any> {
        return this.http.post(this.url, medicamento, CommonService.getJwtHeaders());
    }

    update(medicamento: Medicamento): Observable<any> {
        return this.http.put(this.url + medicamento.idMedicamento, medicamento,  CommonService.getJwtHeaders());
    }

    delete(idMedicamento: String): Observable<any> {        
        return this.http.delete(this.url + idMedicamento,  CommonService.getJwtHeaders())
    }
}