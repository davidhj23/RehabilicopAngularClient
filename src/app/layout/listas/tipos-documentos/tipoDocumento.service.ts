import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { CommonService } from '../../../_services';
import { TipoDocumento } from '.';

@Injectable()
export class TipoDocumentoService {
    
    url = '/api/tipos-documentos/';
    
    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get(this.url,  CommonService.getJwtHeaders());
    }

    getById(id: string): Observable<any> {
        return this.http.get(this.url + id,  CommonService.getJwtHeaders());
    }

    create(tipoDocumento: TipoDocumento): Observable<any> {
        return this.http.post(this.url, tipoDocumento, CommonService.getJwtHeaders());
    }

    update(tipoDocumento: TipoDocumento): Observable<any> {
        return this.http.put(this.url + tipoDocumento.idTipoDocumento, tipoDocumento,  CommonService.getJwtHeaders());
    }

    delete(id: number): Observable<any> {
        return this.http.delete(this.url + id,  CommonService.getJwtHeaders())
    }
}