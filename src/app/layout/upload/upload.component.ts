import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { User } from '../../_models/index';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
    selector: 'my-app',
    templateUrl: 'upload.template.html',
    styleUrls: ['upload.style.css']
})

export class UploadComponent {

    private isUploadBtn: boolean = true;
    currentUser: User;
    userSession: string;

    constructor(private http: HttpClient) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.userSession = String(localStorage.getItem('userSession'));
    }

    //file upload event  
    fileChange(event: any) {
        
        let fileList: FileList = event.target.files;

        if (fileList.length > 0) {

            let file: File = fileList[0];
            let formData: FormData = new FormData();

            formData.append('uploadFile', file, file.name);

            let token = JSON.parse(localStorage.getItem('currentUser'))
            
            let headers = new HttpHeaders({
                'Authorization': token,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            });

            //headers.append('Content-Type', 'json');  
            //headers.append('Accept', 'application/json');  

            let apiUrl1 = "/api/upload";

            this.http.post(apiUrl1, formData, { headers: headers })                
                .catch(error => Observable.throw(error))
                .subscribe(
                    data => console.log('success'),
                    error => console.log(error)
                )
        }
        //window.location.reload();
    }
}  