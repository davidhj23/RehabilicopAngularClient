import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { CommonService } from '../../../_services';
import { User } from './user';

@Injectable()
export class UserService {
    
    url = '/api/usuarios/';
    validatePermissionUrl = this.url + 'permisos';
    meUrl = this.url + 'me';
    
    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get(this.url,  CommonService.getJwtHeaders());
    }

    getById(id: string): Observable<any> {
        return this.http.get(this.url + id,  CommonService.getJwtHeaders());
    }

    getMe(): Observable<any> {        
        return this.http.get(this.meUrl,  CommonService.getJwtHeaders());
    }

    create(user: User): Observable<any> {
        return this.http.post(this.url, user, CommonService.getJwtHeaders());
    }

    update(user: User): Observable<any> {
        return this.http.put(this.url + user, user,  CommonService.getJwtHeaders());
    }

    delete(id: string): Observable<any> {
        return this.http.delete(this.url + id,  CommonService.getJwtHeaders())
    }

    getPermissions(): Observable<any>{
        return this.http.get(this.validatePermissionUrl,  CommonService.getJwtHeaders())   
    }

    validatePermission(permission: string) {
        let permissions = JSON.parse(localStorage.getItem('permissions'));  
        
        if(permissions != null){
            if (permissions.indexOf(permission) > -1) {
                return true;
            } else {
                return false;
            } 
        }
    }

    changePassword(model: any){
        return this.http.post(this.url + 'password', model, CommonService.getJwtHeaders());
    }

    restablecerPassword(model: any){
        return this.http.post(this.url + model.idUsuario + '/password', model, CommonService.getJwtHeaders());
    }

    getAllMedicos(): Observable<any> {
        return this.http.get(this.url + 'medicos', CommonService.getJwtHeaders());
    }

    getAllPsiquiatras(): Observable<any> {
        return this.http.get(this.url + 'psiquiatras', CommonService.getJwtHeaders());
    }

    getAllEnfermeros(): Observable<any> {
        return this.http.get(this.url  + 'enfermeros', CommonService.getJwtHeaders());
    }

    getAllAuditores(): Observable<any> {
        return this.http.get(this.url  + 'auditores', CommonService.getJwtHeaders());
    }
}