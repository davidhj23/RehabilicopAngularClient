import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { CommonService } from '../../../_services';
import { Evolucion } from './evolucion';

@Injectable()
export class EvolucionService {
    
    url = '/api/evoluciones/';    
    
    constructor(private http: HttpClient) { }

    create(evolucion: Evolucion): Observable<any> {
        return this.http.post(this.url, evolucion, CommonService.getJwtHeaders());
    }

    getTiposEvoluciones(): Observable<any> {        
        return this.http.get(this.url + 'tipos-evoluciones',  CommonService.getJwtHeaders());
    }

    getAllEvoluciones(idAseguradora: string, anio: string, mes: string): Observable<any> {                
        let url = this.url + 'aseguradora/' + idAseguradora +
                             '/anio/' + anio + 
                             '/mes/' + mes;

        return this.http.get(url,  CommonService.getJwtHeaders());
    }
}