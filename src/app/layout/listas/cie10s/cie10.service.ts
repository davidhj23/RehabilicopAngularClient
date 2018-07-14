import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { of } from '../../../../../node_modules/rxjs/observable/of';

import { CommonService } from '../../../_services';
import { Cie10 } from '.';

@Injectable()
export class Cie10Service {
    
    url = '/api/cie10s/';
    
    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get(this.url,  CommonService.getJwtHeaders());
    }

    getById(idCie10: String): Observable<any> {
        return this.http.get(this.url + idCie10,  CommonService.getJwtHeaders());
    }

    create(cie10: Cie10): Observable<any> {
        return this.http.post(this.url, cie10, CommonService.getJwtHeaders());
    }

    update(cie10: Cie10): Observable<any> {
        return this.http.put(this.url + cie10.idCie10, cie10,  CommonService.getJwtHeaders());
    }

    delete(idCie10: String): Observable<any> {        
        return this.http.delete(this.url + idCie10,  CommonService.getJwtHeaders())
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
}
