
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { CommonService } from '../../../_services';
import { CuidadosDeEnfermeria } from './cuidadosDeEnfermeria';

@Injectable()
export class CuidadosDeEnfermeriaService {
    
    url = '/api/cuidados-de-enfermeria/';    
    
    constructor(private http: HttpClient) { }

    create(cuidadosDeEnfermeria: CuidadosDeEnfermeria): Observable<any> {
        return this.http.post(this.url, cuidadosDeEnfermeria, CommonService.getJwtHeaders());
    }

    getCuidadosDeEnfermeriaByPaciente(idPaciente: String): Observable<any>{
        return this.http.get(this.url + 'paciente/' + idPaciente, CommonService.getJwtHeaders());
    }
}