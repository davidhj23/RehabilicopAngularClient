import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { CommonService } from '../../../_services';
import { OrdenMedica } from './ordenMedica';
import { MedicamentosOrdenMedica } from './medicamentosOrdenMedica';

@Injectable()
export class OrdenMedicaService {
    
    url = '/api/orden-medica/';    
    
    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get(this.url,  CommonService.getJwtHeaders());
    }

    getPendientes(): Observable<any> {
        return this.http.get(this.url + 'pendientes/',  CommonService.getJwtHeaders());
    }

    getEnProceso(): Observable<any> {
        return this.http.get(this.url + 'en-proceso/',  CommonService.getJwtHeaders());
    }

    getById(idOrdenMedica: String): Observable<any> {
        return this.http.get(this.url + idOrdenMedica,  CommonService.getJwtHeaders());
    }
    
    getByPaciente(idPaciente: String): Observable<any> {
        return this.http.get(this.url + idPaciente,  CommonService.getJwtHeaders());
    }

    create(ordenMedica: OrdenMedica): Observable<any> {
        return this.http.post(this.url, ordenMedica, CommonService.getJwtHeaders());
    }

    getMedicamentosByIdOrdenMedica(id: string): Observable<any> {
        return this.http.get(this.url + id + '/medicamentos', CommonService.getJwtHeaders());
    }

    getAdministraciones(id: string): Observable<any> {
        return this.http.get(this.url + '/medicamentos/' + id + '/administraciones' , CommonService.getJwtHeaders());
    }

    update(ordenMedica: OrdenMedica): Observable<any> {
        return this.http.put(this.url + ordenMedica.idOrdenMedica, ordenMedica,  CommonService.getJwtHeaders());
    }

    delete(id: any): Observable<any> {
        return this.http.delete(this.url + id,  CommonService.getJwtHeaders())
    }

    deleteMedicamentos(id: any): Observable<any> {        
        return this.http.delete(this.url + 'medicamentos/' + id, CommonService.getJwtHeaders())
    }
    
}