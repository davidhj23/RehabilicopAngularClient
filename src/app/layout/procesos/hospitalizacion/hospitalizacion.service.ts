
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { CommonService } from '../../../_services';
import { Hospitalizacion } from './hospitalizacion';

@Injectable()
export class HospitalizacionService {
    
    url = '/api/hospitalizacion/';    
    
    constructor(private http: HttpClient) { }

    create(hospitalizacion: Hospitalizacion): Observable<any> {
        return this.http.post(this.url, hospitalizacion, CommonService.getJwtHeaders());
    }

    getHospitalizacionByPaciente(idPaciente: String): Observable<any>{
        return this.http.get(this.url + 'paciente/' + idPaciente, CommonService.getJwtHeaders());
    }
}