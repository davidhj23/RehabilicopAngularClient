import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CommonService } from '../../../_services';
import { Rol } from '.';

@Injectable()
export class RolService {
    
    url = '/api/roles/';

    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get(this.url,  CommonService.getJwtHeaders());
    }

    getById(id: string): Observable<any> {
        return this.http.get(this.url + id,  CommonService.getJwtHeaders());
    }

    create(rol: Rol): Observable<any> {
        return this.http.post(this.url, rol, CommonService.getJwtHeaders());
    }

    update(rol: Rol): Observable<any> {
        return this.http.put(this.url + rol.idRol, rol,  CommonService.getJwtHeaders());
    }

    delete(id: string): Observable<any> {
        return this.http.delete(this.url + id,  CommonService.getJwtHeaders())
    }
}