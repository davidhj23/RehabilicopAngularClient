import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
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
}