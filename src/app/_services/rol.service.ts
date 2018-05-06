import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../_models/index';
import { CommonService } from '../_services/index';
import { Observable } from 'rxjs/Observable';
import { Rol } from '../_models/rol';

@Injectable()
export class RolService {
    
    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get('/api/roles/',  CommonService.getJwtHeaders());
    }

    getById(id: string): Observable<any> {
        return this.http.get('/api/roles/' + id,  CommonService.getJwtHeaders());
    }

    create(rol: Rol): Observable<any> {
        return this.http.post('/api/roles/', rol, CommonService.getJwtHeaders());
    }

    update(rol: Rol): Observable<any> {
        return this.http.put('/api/roles/' + rol.idRol, rol,  CommonService.getJwtHeaders());
    }

    delete(id: number): Observable<any> {
        return this.http.delete('/api/roles/' + id,  CommonService.getJwtHeaders())
    }
}