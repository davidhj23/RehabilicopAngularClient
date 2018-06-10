import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { CommonService } from '../../../_services';
import { Comprensible } from '.';

@Injectable()
export class ComprensibleService {
    
    url = '/api/comprensibles/';
    
    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get(this.url,  CommonService.getJwtHeaders());
    }

    getById(idComprensible: String): Observable<any> {
        return this.http.get(this.url + idComprensible,  CommonService.getJwtHeaders());
    }

    create(comprensible: Comprensible): Observable<any> {
        return this.http.post(this.url, comprensible, CommonService.getJwtHeaders());
    }

    update(comprensible: Comprensible): Observable<any> {
        return this.http.put(this.url + comprensible.idComprensible, comprensible,  CommonService.getJwtHeaders());
    }

    delete(idComprensible: String): Observable<any> {        
        return this.http.delete(this.url + idComprensible,  CommonService.getJwtHeaders())
    }
}