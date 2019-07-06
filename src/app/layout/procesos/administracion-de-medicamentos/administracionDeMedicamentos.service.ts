
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { CommonService } from '../../../_services';
import { AdministracionDeMedicamentos } from './administracionDeMedicamentos';

@Injectable()
export class AdministracionDeMedicamentosService {
    
    url = '/api/administracion-de-medicamentos/';    
    
    constructor(private http: HttpClient) { }

    create(administracionDeMedicamentos: AdministracionDeMedicamentos): Observable<any> {
        return this.http.post(this.url, administracionDeMedicamentos, CommonService.getJwtHeaders());
    }

    getAdministracionDeMedicamentosByPaciente(idPaciente: String): Observable<any>{
        return this.http.get(this.url + 'paciente/' + idPaciente, CommonService.getJwtHeaders());
    }
}