import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CommonService } from '../../../_services';
import { Rol } from '.';
import { Permiso } from '../permisos/permiso';
import { analyzeAndValidateNgModules } from '@angular/compiler';

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
        return this.http.delete(this.url + id, CommonService.getJwtHeaders())
    }

    getPermisosActualesByIdRol(id: string): Observable<any>{
        return this.http.get(this.url + id + '/permisos',  CommonService.getJwtHeaders());
    }

    createPermiso(id: string, permiso: Permiso): Observable<any> {
        return this.http.post(this.url + id + '/permisos', permiso, CommonService.getJwtHeaders());
    }

    deletePermiso(id: string, permiso: Permiso): Observable<any> {        
        return this.http.delete(this.url + id + '/permisos/' + permiso.idPermiso, CommonService.getJwtHeaders())
    }
}