import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CommonService {     

    public static imagesPath : string = "/src/files/";
    public static eventImagesPath : string = CommonService.imagesPath + "events/";
    public static promoterImagesPath : string = CommonService.imagesPath + "promoters/";
    public static noPreviewImageName : string = CommonService.imagesPath + "noPreviewImage.jpg";

    constructor(){ }

    public static getJwtHeaders() {
        let jwtToken = JSON.parse(localStorage.getItem('jwtToken'));
        if (jwtToken && jwtToken.token) {             
            let headers = new HttpHeaders({ 'contentType': 'application/json', 'Accept': 'application/json', 'Authorization': jwtToken.token });
            return { headers: headers };
        }
    }

    public static getJwtHeadersForFiles() {
        let jwtToken = JSON.parse(localStorage.getItem('jwtToken'));
        if (jwtToken && jwtToken.token) {
            let headers = new HttpHeaders({ 'Accept': 'application/json', 'Authorization': jwtToken.token });
            return { headers: headers };
        }
    }     

    public static getImageUrl(entity: string, imageName: string, callback: (imagePath: string) => void){

        let imagePath = CommonService.getEntityImagePath(entity) + imageName;        

        let img = new Image();
        img.onload = function() { 
            callback(imagePath);             
        };
        img.onerror = function() { 
            callback(CommonService.noPreviewImageName);               
        };
        img.src = imagePath;        
    }

    private static getEntityImagePath(entity: string){
        let imagePath = '';

        switch(entity) {            
            case'evento': {
                imagePath = CommonService.eventImagesPath;
                break;
            }
            case'promotor': {
                imagePath = CommonService.promoterImagesPath;
                break;
            }
        }

        return imagePath; 
    }
}