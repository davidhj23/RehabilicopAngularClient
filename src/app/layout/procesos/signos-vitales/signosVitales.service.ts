import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { CommonService } from '../../../_services';
import { SignosVitales } from './signosVitales';

@Injectable()
export class SignosVitalesService {
    
    url = '/api/signos-vitales/';    
    
    constructor(private http: HttpClient) { }

    create(signosVitales: SignosVitales): Observable<any> {
        return this.http.post(this.url, signosVitales, CommonService.getJwtHeaders());
    }

    getSignosVitalesByPaciente(idPaciente: String): Observable<any>{
        return this.http.get(this.url + 'paciente/' + idPaciente, CommonService.getJwtHeaders());
    }
}