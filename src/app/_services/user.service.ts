import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../_models/index';
import { CommonService } from '../_services/index';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {
    
    validatePermissionUrl = '/api/usuarios/permisos/';
    
    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get('/api/usuarios/',  CommonService.getJwtHeaders());
    }

    getById(id: string): Observable<any> {
        return this.http.get('/api/usuarios/' + id,  CommonService.getJwtHeaders());
    }

    getMe(): Observable<any> {        
        return this.http.get('/api/usuarios/me',  CommonService.getJwtHeaders());
    }

    update(user: User): Observable<any> {
        return this.http.put('/api/usuarios/' + user, user,  CommonService.getJwtHeaders());
    }

    delete(id: number): Observable<any> {
        return this.http.delete('/api/usuarios/' + id,  CommonService.getJwtHeaders())
    }

    register(user: User): Observable<any> {
        return this.http.post('/api/usuarios/clientes/', user);
    }

    getPermissions(): Observable<any>{
        return this.http.get('/api/usuarios/permisos',  CommonService.getJwtHeaders())        
            /*.map((response: Response) => {  
                let permissions = response.json();
                if (permissions) {                     
                    localStorage.setItem('permissions', JSON.stringify(permissions)); 
                }
            });*/
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
}