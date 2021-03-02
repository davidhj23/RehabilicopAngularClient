export class Util {

    public static validateEmail(email: string) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    public static validateDate(date: string) {
        let from = date.split("/");
        let year = Number(from[2]);
        let month = Number(from[1]) - 1;
        let day = Number(from[0]);

        if(Number.isNaN(year) || year < 1900 || year > 2100){
            return false;
        }

        if(Number.isNaN(month) || month < 0 || month > 11){
            return false;
        }

        if(Number.isNaN(day) || day < 1 || day > 31){
            return false;
        }
        
        return true; 
    }

    public static getDate(dateString: string){
        let from = dateString.split("/");
        let year = Number(from[2]);
        let month = Number(from[1]) - 1;
        let day = Number(from[0]);

        let date = new Date(Number(from[2]), Number(from[1]) - 1, Number(from[0]))        
        return date;
    }

    public static formattedDate(timestamp: any) {

        var d = new Date(timestamp);

        let day = String(d.getDate());
        let month = String(d.getMonth() + 1);        
        let year = String(d.getFullYear());
      
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
      
        return `${day}/${month}/${year}`;
      }
    
    public static formattedDateForDatePicker(timestamp: any) {        
        var d = new Date(timestamp);

        let day = String(d.getDate());
        let month = String(d.getMonth() + 1);        
        let year = String(d.getFullYear());
        
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
      
        let date = {
            year: Number(year),
            month: Number(month),
            day: Number(day)
        }

        return date;
    }

    public static calculateAge(date: any){
        if(date){
             var timeDiff = Math.abs(Date.now() - date);             
             return Math.floor((timeDiff / (1000 * 3600 * 24))/365);
        }
    }

    public static b64toBlob(b64Data: any, contentType='', sliceSize=512){
        const byteCharacters = atob(b64Data);
        const byteArrays = [];
      
        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
          const slice = byteCharacters.slice(offset, offset + sliceSize);
      
          const byteNumbers = new Array(slice.length);
          for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
          }
      
          const byteArray = new Uint8Array(byteNumbers);
          byteArrays.push(byteArray);
        }
          
        const blob = new Blob(byteArrays, {type: contentType});
        return blob;
    }

    public static base64ToArrayBuffer(base64: any) {
        var binary_string =  window.atob(base64);
        var len = binary_string.length;
        var bytes = new Uint8Array( len );
        for (var i = 0; i < len; i++)        {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes.buffer;
    }
}