import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthenticationService {

    constructor(private http: HttpClient) {}

    login(username: string, password: string): Observable<any>{        
        return this.http.post('/api/auth', { username: username, password: password })        
            /*.map((response: Response) => {   
                let json = response.json();
                if (json && json.token) {                    
                    localStorage.setItem('jwtToken', JSON.stringify(json)); 
                }
            });*/
            /*.map(
                response => {                                         
                    //if (response && response.token) {                    
                        //localStorage.setItem('jwtToken', JSON.stringify(json)); 
                    //}
                }
            );*/
    }

    logout() {        
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('permissions');
    }
}