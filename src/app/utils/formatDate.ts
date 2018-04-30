
export class FormatDate {

    private formatDate(dateParam: Date) {
        let date = dateParam; // had to remove the colon (:) after the T in order to make it work
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let minutes = date.getMinutes();
        let hours = date.getHours();
        let seconds = date.getSeconds();
        let myFormattedDate = year + "/" + month + "/" + day + " " + hours + ":" + minutes + ":" + seconds;
        return myFormattedDate;
    }

}