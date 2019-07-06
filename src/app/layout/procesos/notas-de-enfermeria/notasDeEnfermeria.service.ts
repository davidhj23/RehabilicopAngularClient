import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { CommonService } from '../../../_services';
import { NotasDeEnfermeria } from './notasDeEnfermeria';

@Injectable()
export class NotasDeEnfermeriaService {
    
    url = '/api/notas-de-enfermeria/';    
    
    constructor(private http: HttpClient) { }

    create(notasDeEnfermeria: NotasDeEnfermeria): Observable<any> {
        return this.http.post(this.url, notasDeEnfermeria, CommonService.getJwtHeaders());
    }

    getNotasDeEnfermeriaByPaciente(idPaciente: String): Observable<any>{
        return this.http.get(this.url + 'paciente/' + idPaciente, CommonService.getJwtHeaders());
    }
}