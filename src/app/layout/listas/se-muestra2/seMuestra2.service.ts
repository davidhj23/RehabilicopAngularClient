import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { CommonService } from '../../../_services';
import { SeMuestra2 } from '.';

@Injectable()
export class SeMuestra2Service {
    
    url = '/api/se-muestra2/';
    
    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get(this.url,  CommonService.getJwtHeaders());
    }

    getById(id: string): Observable<any> {
        return this.http.get(this.url + id,  CommonService.getJwtHeaders());
    }

    create(seMuestra2: SeMuestra2): Observable<any> {
        return this.http.post(this.url, seMuestra2, CommonService.getJwtHeaders());
    }

    update(seMuestra2: SeMuestra2): Observable<any> {
        return this.http.put(this.url + seMuestra2.idSeMuestra2, seMuestra2,  CommonService.getJwtHeaders());
    }

    delete(id: string): Observable<any> {
        return this.http.delete(this.url + id,  CommonService.getJwtHeaders())
    }
}