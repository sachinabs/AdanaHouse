function showCount() {
    let eveningData = document.getElementById("evening");
    let morningData = document.getElementById("morning");
    let afternoonData = document.getElementById("afternoon");
    let nightData = document.getElementById("night");
    let date = document.getElementById("view-count-date").value;
    let httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(JSON.parse(this.response));
            jsonData = JSON.parse(this.response);
            if (jsonData.length == 0) {
                morningData.innerHTML = "0/300";
                afternoonData.innerHTML = "0/300";
                eveningData.innerHTML = "0/300";
                nightData.innerHTML = "0/300";


            } else {
                for (let i = 0; i < jsonData.length; i++) {
                    console.log(jsonData[i].Time);
                    if (jsonData[i].Time == "Morning") {
                        console.log(jsonData[i].YesCount);
                        morningData.innerHTML = jsonData[i].YesCount + "/300";
                    }
                    if (jsonData[i].Time == "After-Noon") {
                        console.log(jsonData[i].YesCount);
                        afternoonData.innerHTML = jsonData[i].YesCount + "/300";
                    }
                    if (jsonData[i].Time == "Evening") {
                        console.log(jsonData[i].YesCount);
                        eveningData.innerHTML = jsonData[i].YesCount + "/300";
                    }
                    if (jsonData[i].Time == "Night") {
                        console.log(jsonData[i].YesCount);
                        nightData.innerHTML = jsonData[i].YesCount + "/300";
                    }

                }
            }


        }
    }

    httpRequest.open("GET", "http://localhost:1011/counts?Date=" + date, true);
    httpRequest.send();

}