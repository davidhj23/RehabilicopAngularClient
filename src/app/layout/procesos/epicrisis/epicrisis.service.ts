
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { CommonService } from '../../../_services';
import { Epicrisis } from './epicrisis';

@Injectable()
export class EpicrisisService {
    
    url = '/api/epicrisis/';    
    
    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get(this.url,  CommonService.getJwtHeaders());
    }

    getById(idEpicrisis: String): Observable<any> {
        return this.http.get(this.url + idEpicrisis,  CommonService.getJwtHeaders());
    }
    
    getByPaciente(idPaciente: String): Observable<any> {
        return this.http.get(this.url + idPaciente,  CommonService.getJwtHeaders());
    }

    create(epicrisis: Epicrisis): Observable<any> {
        return this.http.post(this.url, epicrisis, CommonService.getJwtHeaders());
    }

    getMedicamentosByIdEpicrisis(id: string): Observable<any> {
        return this.http.get(this.url + id + '/medicamentos', CommonService.getJwtHeaders());
    }

    update(epicrisis: Epicrisis): Observable<any> {
        return this.http.put(this.url + epicrisis.idEpicrisis, epicrisis,  CommonService.getJwtHeaders());
    }

    generateReport(idAdmision: String): Observable<any> {
        return this.http.get(this.url + 'reporte/' + idAdmision, CommonService.getPdfJwtHeaders());
    }

    /*delete(idDosis: String): Observable<any> {        
        return this.http.delete(this.url + idDosis,  CommonService.getJwtHeaders())
    }*/
}