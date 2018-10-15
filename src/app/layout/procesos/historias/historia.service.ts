import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { CommonService } from '../../../_services';
import { Historia } from './historia';

@Injectable()
export class HistoriaService {
    
    url = '/api/historias/';    
    
    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get(this.url,  CommonService.getJwtHeaders());
    }

    getById(id: string): Observable<any> {
        return this.http.get(this.url + id,  CommonService.getJwtHeaders());
    }    

    create(historia: Historia): Observable<any> {
        return this.http.post(this.url, historia, CommonService.getJwtHeaders());
    }

    update(historia: Historia): Observable<any> {
        return this.http.put(this.url + historia.idHistoria, historia,  CommonService.getJwtHeaders());
    }

    delete(id: string): Observable<any> {
        return this.http.delete(this.url + id,  CommonService.getJwtHeaders())
    }

    getPatologicosByIdHistoria(id: string): Observable<any> {
        return this.http.get(this.url + id + '/patologicos', CommonService.getJwtHeaders());
    }

    getAntecedentesByIdHistoria(id: string): Observable<any> {
        return this.http.get(this.url + id + '/antecedentes', CommonService.getJwtHeaders());
    }

    getTraumaticosByIdHistoria(id: string): Observable<any> {
        return this.http.get(this.url + id + '/traumaticos', CommonService.getJwtHeaders());
    }

    getFarmacologicosByIdHistoria(id: string): Observable<any> {
        return this.http.get(this.url + id + '/farmacologicos', CommonService.getJwtHeaders());
    }

    getToxicosByIdHistoria(id: string): Observable<any> {
        return this.http.get(this.url + id + '/toxicos', CommonService.getJwtHeaders());
    }

    getGinecoObstetriciosByIdHistoria(id: string): Observable<any> {
        return this.http.get(this.url + id + '/gineco-obstetricios', CommonService.getJwtHeaders());
    }

    getExamenFisicoByIdHistoria(id: string): Observable<any> {
        return this.http.get(this.url + id + '/examen-fisico', CommonService.getJwtHeaders());
    }

    getExamenFisico2ByIdHistoria(id: string): Observable<any> {
        return this.http.get(this.url + id + '/examen-fisico2', CommonService.getJwtHeaders());
    }

    getExamenFisico3ByIdHistoria(id: string): Observable<any> {
        return this.http.get(this.url + id + '/examen-fisico3', CommonService.getJwtHeaders());
    }

    getExamenFisico4ByIdHistoria(id: string): Observable<any> {
        return this.http.get(this.url + id + '/examen-fisico4', CommonService.getJwtHeaders());
    }

    getExamenFisico5ByIdHistoria(id: string): Observable<any> {
        return this.http.get(this.url + id + '/examen-fisico5', CommonService.getJwtHeaders());
    }

    getExamenFisico6ByIdHistoria(id: string): Observable<any> {
        return this.http.get(this.url + id + '/examen-fisico6', CommonService.getJwtHeaders());
    }

    getHistoriaByIdentificacionPaciente(id: string): Observable<any>{
        return this.http.get(this.url + 'paciente/' + id,  CommonService.getJwtHeaders());
    }
}