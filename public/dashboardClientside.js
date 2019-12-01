var tempTimeIn;

/*
* get the time instance for when the user clocks-in
* and send it to the database
*/
function timeIn() {
    // Get date/time instance
    var time = getTime();

    console.log("time-in is: " + time);

    // used for testing instead of DB
    tempTimeIn = time;

    // send time-in instance to database

}

/*
* get the time instance for when the user clocks-out
* and send it to the database
*/
function timeOut() {
    // Get date/time instance
    //var time = getTime();

    //console.log("time-out is: " + time);

    var time = getTime();

    console.log("time-out is: " + time);

    var totalTime = Math.round((time - tempTimeIn) / 1000);

    totalTime = getTimeFromSeconds(totalTime);

    console.log("total time is: " + totalTime);

    // get clock-in from db or local storage and make
    // a dailyTime object to send to the db   
   

}

/*
* display the live time to the dashboard
*/
function displayTime() {
    var today   = new Date();
    var year   = (today.getYear() - 100) + 2000;
    var month  = today.getMonth()
    var day    = today.getDate();
    var hour   = today.getHours();
    var minute = today.getMinutes();
    var second = today.getSeconds();
    var amPm = "";

    minute = checkTimeFormat(minute);
    second = checkTimeFormat(second);

    // convert to 12 hour format
    if (hour > 12) {
        hour = hour - 12;
        amPm = "PM";
    }
    else
        amPm = "AM";

    // convert to name of month
    switch (month) {
        case 0:
            month = "January";
            break;
        case 1:
            month = "February";
            break;
        case 2:
            month = "March";
            break;
        case 3:
            month = "April";
            break;
        case 4:
            month = "May";
            break;
        case 5:
            month = "June";
            break;
        case 6:
            month = "July";
            break;
        case 7:
            month = "August";
            break;
        case 8:
            month = "September";
            break;
        case 9:
            month = "October";
            break;
        case 10:
            month = "November";
            break;
        case 11:
            month = "December";
            break;
    }

    // display date
    document.getElementById('date').innerHTML =
        month + " " + day + ", " + year;

    // display time
    document.getElementById('clock').innerHTML =
        hour + ":" + minute + ":" + second + " " + amPm;

    var t = setTimeout(displayTime, 500);
}

/*
* fix formatting for time under 10 seconds
*/
function checkTimeFormat(i) {
    // add zero in front of numbers < 10
    if (i < 10) { i = "0" + i };
    return i;
}

/*
* validate the password for user sign-ip
*/
function validate() {

    var pass = document.getElementById('password').value;
    var check = document.getElementById('passwordMatch').value;

    var same = false;

    if (pass == check && pass.length > 7) {
        document.getElementById('password').style.borderColor = 'green';
        document.getElementById('passwordMatch').style.borderColor = 'green';
        document.getElementById('submitbutton').disabled = false;
    } else {
        document.getElementById('password').style.borderColor = 'red';
        document.getElementById('passwordMatch').style.borderColor = 'red';
        document.getElementById('submitbutton').disabled = true;
    }
}

/*
* convert seconds to H:M:S format
*/
function getTimeFromSeconds(seconds) {

    var hours = Math.floor(seconds / 3600);
    var minutes = Math.floor((seconds - ((hours * 60) * 60)) / 60);
    var seconds = seconds - ((minutes * 60) + ((hours * 60) * 60));

    seconds = checkTimeFormat(seconds);

    return hours + ':' + minutes + ':' + seconds;
}

/*
* get the time since Jan 1 1970
*/
function getTime() {
    var t = new Date();
    return t.getTime();
}








function updateResultList(data) {
    if (data.Search && data.Search.length > 0) {
        var resultList = $('#ulMovies');
        resultList.empty();

        for (var i = 0; i < data.Search.length; i++) {
            var title = data.Search[i].Title;
            var id = data.Search[i].imdbID;
            resultList.append('<li><p>' + title + '<br><button onClick="getDetails(\'' + id + '\')">Details</button></p></li>');
        }
    }
}

function getDetails(id) {
    var params = { i: id, apikey: API_KEY };

    $.get('http://www.omdbapi.com/', params, function (details, status) {
        updateModal(details);
    });
}

function updateModal(details) {
    var modal = $('.modal-content');
    modal.empty();

    var response = '';

    modal.append(response);

    $('#exampleModalCenter').modal('show')
}
