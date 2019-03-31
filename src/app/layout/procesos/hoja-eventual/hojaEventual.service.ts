import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { CommonService } from '../../../_services';
import { HojaEventual } from './hojaEventual';

@Injectable()
export class HojaEventualService {
    
    url = '/api/hoja-eventual/';    
    
    constructor(private http: HttpClient) { }

    create(hojaEventual: HojaEventual): Observable<any> {
        return this.http.post(this.url, hojaEventual, CommonService.getJwtHeaders());
    }

    getHojasEventualesEmpleado(): Observable<any>{
        return this.http.get(this.url + 'empleado',  CommonService.getJwtHeaders());
    }
}