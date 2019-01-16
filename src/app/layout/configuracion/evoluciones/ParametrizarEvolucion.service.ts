import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { CommonService } from '../../../_services';
import { ParametrizacionEvolucion } from './parametrizacionEvolucion';

@Injectable()
export class ParametrizarEvolucionService {
    
    url = '/api/parametrizacion-evoluciones/';    
    
    constructor(private http: HttpClient) { }
    
    getAllTiposEvoluciones(): Observable<any> {
        return this.http.get(this.url + 'tipos-evoluciones',  CommonService.getJwtHeaders());
    }

    getAll(): Observable<any> {
        return this.http.get(this.url,  CommonService.getJwtHeaders());
    }

    create(parametrizacionEvolucion: ParametrizacionEvolucion): Observable<any> {
        return this.http.post(this.url, parametrizacionEvolucion, CommonService.getJwtHeaders());
    }

    delete(id: string): Observable<any> {
        return this.http.delete(this.url + id,  CommonService.getJwtHeaders())
    }

    getAllByAnioAndMes(anio: string, mes: string): Observable<any> {
        let url = this.url + 'anio/' + anio + 
                             '/mes/' + mes;
                             
        return this.http.get(url, CommonService.getJwtHeaders());
    }
}