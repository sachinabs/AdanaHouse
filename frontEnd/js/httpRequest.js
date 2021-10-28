function showCount() {

    let date = document.getElementById("view-count-date").value;
    let httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.response);
        }
    }
   
    httpRequest.open("GET", "http://localhost:1011/counts?Date=" + date, true);
    httpRequest.send();

}