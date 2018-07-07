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

        if(year < 1900 || year > 2100){
            return false;
        }

        if(month < 0 || month > 11){
            return false;
        }

        if(day < 1 || day > 31){
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
}