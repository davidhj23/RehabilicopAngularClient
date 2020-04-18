import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { of } from '../../../../../node_modules/rxjs/observable/of';

import { CommonService } from '../../../_services';
import { Paciente } from './paciente';

@Injectable()
export class PacienteService {
    
    url = '/api/pacientes/';    
    
    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get(this.url,  CommonService.getJwtHeaders());
    }

    getById(id: string): Observable<any> {
        return this.http.get(this.url + id,  CommonService.getJwtHeaders());
    } 

    getByIdentificacion(identificacion: string): Observable<any> {
        return this.http.get(this.url + 'identificacion/' + identificacion,  CommonService.getJwtHeaders());
    }    

    create(paciente: Paciente): Observable<any> {
        return this.http.post(this.url, paciente, CommonService.getJwtHeaders());
    }

    update(paciente: Paciente): Observable<any> {
        return this.http.put(this.url + paciente.idUsuario, paciente,  CommonService.getJwtHeaders());
    }

    delete(id: string): Observable<any> {
        return this.http.delete(this.url + id,  CommonService.getJwtHeaders())
    }

    search(search: string) {
        if (search === '') {
          return of([]);
        }
    
        return this.http.get(this.url + 'search/' + search, CommonService.getJwtHeaders())
                    .pipe(
                        map(res => res)
                    )
    }

    generateReportHistoria(idAdmision: String): Observable<any> {
        return this.http.get(this.url + 'reporte-historia/' + idAdmision, CommonService.getPdfJwtHeaders());
    }

    generateReportEvoluciones(idAdmision: String): Observable<any> {
        return this.http.get(this.url + 'reporte-evoluciones/' + idAdmision, CommonService.getPdfJwtHeaders());
    }

    generateReportOrdenesMedicas(idAdmision: String): Observable<any> {
        return this.http.get(this.url + 'reporte-ordenes-medicas/' + idAdmision, CommonService.getPdfJwtHeaders());
    }

    generateReportEpicrisis(idAdmision: String): Observable<any> {
        return this.http.get(this.url + 'reporte-epicrisis/' + idAdmision, CommonService.getPdfJwtHeaders());
    }

    generateReportNotas(idAdmision: String): Observable<any> {
        return this.http.get(this.url + 'reporte-notas/' + idAdmision, CommonService.getPdfJwtHeaders());
    }
}