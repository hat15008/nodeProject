var tempTimeIn;

function timeIn() {
    // Get date/time instance
    var time = getTime();

    console.log("time-in is: " + time);

    var month  = time[0];
    var day    = time[1];
    var year   = time[2];
    var hour   = time[3];
    var minute = time[4];
    var second = time[5];

    var timeObject = { 
        month, 
        day, 
        year, 
        hour, 
        minute, 
        second 
    };

    var timeJSON = JSON.stringify(timeObject);

    // send time-in instance to database


    console.log("time-in to JSON:");
    console.log(timeObject);

    tempTimeIn = timeObject;

}

function timeOut() {
    // Get date/time instance
    var time = getTime();

    console.log("time-out is: " + time);

    // get clock-in from db or local storage and make
    // a dailyTime object to send to the db   
    
    var timeIn_month  = tempTimeIn.month;
    var timeIn_day    = tempTimeIn.day;
    var timeIn_year   = tempTimeIn.year;
    var timeIn_hour   = tempTimeIn.hour;
    var timeIn_minute = tempTimeIn.minute;
    var timeIn_second = tempTimeIn.second;

    var timeOut_month  = time[0];
    var timeOut_day    = time[1];
    var timeOut_year   = time[2];
    var timeOut_hour   = time[3];
    var timeOut_minute = time[4];
    var timeOut_second = time[5];

    var total_hours   = timeOut_hour - timeIn_hour;
    var total_minutes = timeOut_minute - timeIn_minute;
    var total_seconds = timeOut_second - timeIn_second;

    console.log('Total time in: ' + total_hours + ' hours ' + total_minutes + ' minutes ' + total_seconds + ' seconds ');

    var shiftInstance = { 
        timeIn_month,
        timeIn_day,
        timeIn_year,
        timeIn_hour,
        timeIn_minute,
        timeIn_second,

        timeOut_month,
        timeOut_day,
        timeOut_year,
        timeOut_hour,
        timeOut_minute,
        timeOut_second,

        total_hours,
        total_minutes,
        total_seconds
    };

    // convert object to JSON
    shiftInstance = JSON.stringify(shiftInstance);

    //console.log("shiftInstance Object to JSON:");
    //console.log(shiftInstance);

}

function getTime() {
    var today   = new Date();
    var year   = (today.getYear() - 100) + 2000;
    var month  = today.getMonth()
    var day    = today.getDate();
    var hour   = today.getHours();
    var minute = today.getMinutes();
    var second = today.getSeconds();

    return [month, day, year, hour, minute, second];
}

// display the live time to the dashboard
function displayTime() {
    var time = getTime();
    var year = time[0];
    var month = time[1];
    var day = time[2];
    var hour = time[3];
    var minute = time[4];
    var second = time[5];
    var amPm = "";

    minute = checkTimeFormat(minute);
    second = checkTimeFormat(second);

    // convert to 12 hour format
    if (hour > 12) {
        hour = hour - 12;
        amPm = "pm";
    }
    else
        amPm = "am";

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

function checkTimeFormat(i) {
    // add zero in front of numbers < 10
    if (i < 10) { i = "0" + i };
    return i;
}

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
