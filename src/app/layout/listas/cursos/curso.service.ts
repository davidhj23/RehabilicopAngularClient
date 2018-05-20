import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { CommonService } from '../../../_services';
import { Curso } from '.';

@Injectable()
export class CursoService {
    
    url = '/api/cursos/';
    
    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get(this.url,  CommonService.getJwtHeaders());
    }

    getById(idCurso: String): Observable<any> {
        return this.http.get(this.url + idCurso,  CommonService.getJwtHeaders());
    }

    create(curso: Curso): Observable<any> {
        return this.http.post(this.url, curso, CommonService.getJwtHeaders());
    }

    update(curso: Curso): Observable<any> {
        return this.http.put(this.url + curso.idCurso, curso,  CommonService.getJwtHeaders());
    }

    delete(idCurso: String): Observable<any> {        
        return this.http.delete(this.url + idCurso,  CommonService.getJwtHeaders())
    }
}