/*
* get the time instance for when the user clocks-in
* and send it to the db
*/
function timeIn() {
    // Get date/time instance
    var timeIn = getTime();

    // send time-in instance to localstorage
    localStorage.setItem('TCClock_in', timeIn);
}

/*
* get the time instance for when the user clocks-out
* and send it to the db
*/
function timeOut() {
    // Get date/time instance
    var clockOut = getTime();

    // get clock-in from local storage
    var clockIn = localStorage.getItem('TCClock_in');

    // get past time instances from db
    if (db) {
        var allTimeJson = db;
        //console.log('db all time: ' + allTimeJson);
    } else {
        var allTimeJson = '';
        //console.log('all time: ' + allTimeJson);
    }

    // make current instance of in/out
    var DailyTime = {
        "dailyInstance": [
            { "clockIn": clockIn },
            { "clockOut": clockOut }]
    }

    // make object into JSON string
    DailyTime = JSON.stringify(DailyTime);
    console.log('daily instance: ' + DailyTime);

    // db instances += current instance
    allTimeJson = allTimeJson.concat(DailyTime);

    allTimeJson = JSON.stringify(allTimeJson);

    // send updated time object to the db    
    db.setItem('TCDaily_time', JSON.stringify(allTimeJson));

    // remove saved clockIn from local storage
    localStorage.removeItem('TCClock_in');



    console.log('total time: ' + calculateTimeWorked(clockIn, clockOut));

}

/*
* display the live time to the dashboard
*/
function displayTime() {
    var today = new Date();
    var year = (today.getYear() - 100) + 2000;
    var month = today.getMonth()
    var day = today.getDate();
    var hour = today.getHours();
    var minute = today.getMinutes();
    var second = today.getSeconds();
    var amPm = '';

    minute = checkTimeFormat(minute);
    second = checkTimeFormat(second);

    // convert to 12 hour format
    if (hour > 12) {
        hour = hour - 12;
        amPm = 'PM';
    }
    else
        amPm = 'AM';

    if (hour = 0 ) {
        hour = 12;
        console.log('hour: ' + hour);
    }

    // convert int to name of month
    switch (month) {
        case 0:
            month = 'January';
            break;
        case 1:
            month = 'February';
            break;
        case 2:
            month = 'March';
            break;
        case 3:
            month = 'April';
            break;
        case 4:
            month = 'May';
            break;
        case 5:
            month = 'June';
            break;
        case 6:
            month = 'July';
            break;
        case 7:
            month = 'August';
            break;
        case 8:
            month = 'September';
            break;
        case 9:
            month = 'October';
            break;
        case 10:
            month = 'November';
            break;
        case 11:
            month = 'December';
            break;
    }

    // display date
    document.getElementById('date').innerHTML =
        month + ' ' + day + ', ' + year;

    // display time
    document.getElementById('clock').innerHTML =
        hour + ':' + minute + ':' + second + ' ' + amPm;

    var t = setTimeout(displayTime, 500);
}

/*
* fix formatting for time under 10 seconds
*/
function checkTimeFormat(i) {
    // add zero in front of numbers < 10
    if (i < 10) { i = '0' + i };
    return i;
}

/*
* convert seconds to H:M:S format
*/
function getTimeFromSeconds(seconds) {

    var time = new Date(seconds);

    console.log(time);

    var hour = time.getHours();
    var minute = time.getMinutes();
    var second = time.getSeconds();

    return hour + ':' + minute + ':' + second;
}

/*
* calculate the time that the user has worked
*/
function calculateTimeWorked(secondsIn, secondsOut) {

    var secondsWorked = (secondsOut - secondsIn) / 1000;

    var hours = Math.floor(secondsWorked / 3600);
    var minutes = Math.floor((secondsWorked - ((hours * 60) * 60)) / 60);
    var seconds = Math.round(secondsWorked - ((minutes * 60) + ((hours * 60) * 60)));

    seconds = checkTimeFormat(seconds);

    console.log('after convert to seconds: ' + hours + ':' + minutes + ':' + seconds)

    return hours + ':' + minutes + ':' + seconds;
}

/*
* get the time since Jan 1 1970
*/
function getTime() {
    var t = new Date();
    return t.getTime();
}

/*
* clear the data from the db for the start of a new pay period
*/
function clearData() {
    //db.removeItem('TCDaily_time');
    //db.removeItem('TCClock_in');
}

/*
* get the hours from the db and show in the table
*/
function showHours() {

    var allTimeJson = "";

    $.post("/getHours", function (result) {
        if (result && result.success) {
            allTimeJson = userTimeWorked;
        } else {
            $("#status").text("Error loading time worked.");
        }
    });

    // parse into object
    allTimeJson = JSON.parse(allTimeJson);

    // change table HTML to show hours
    var heading = '<tr><th>Date</th><th>Time-In</th><th>Time-Out</th></tr>';

    for (var key in allTimeJson) {
        if (allTimeJson.hasOwnProperty(key)) {
            //console.log(key + " -> " + allTimeJson[key]);
        }
        console.log(key + " -> " + allTimeJson[key]);
    }

}













// var tempTimeIn;

// /*
// * get the time instance for when the user clocks-in
// * and send it to the database
// */
// function timeIn() {
//     // Get date/time instance
//     var time = getTime();

//     console.log("time-in is: " + time);

//     // used for testing instead of DB
//     tempTimeIn = time;

//     // send time-in instance to database

// }

// /*
// * get the time instance for when the user clocks-out
// * and send it to the database
// */
// function timeOut() {
//     // Get date/time instance
//     //var time = getTime();

//     //console.log("time-out is: " + time);

//     var time = getTime();

//     console.log("time-out is: " + time);

//     var totalTime = Math.round((time - tempTimeIn) / 1000);

//     totalTime = getTimeFromSeconds(totalTime);

//     console.log("total time is: " + totalTime);

//     // get clock-in from db or local storage and make
//     // a dailyTime object to send to the db   


// }

// /*
// * display the live time to the dashboard
// */
// function displayTime() {
//     var today   = new Date();
//     var year   = (today.getYear() - 100) + 2000;
//     var month  = today.getMonth()
//     var day    = today.getDate();
//     var hour   = today.getHours();
//     var minute = today.getMinutes();
//     var second = today.getSeconds();
//     var amPm = "";

//     minute = checkTimeFormat(minute);
//     second = checkTimeFormat(second);

//     // convert to 12 hour format
//     if (hour > 12) {
//         hour = hour - 12;
//         amPm = "PM";
//     }
//     else
//         amPm = "AM";

//     // convert to name of month
//     switch (month) {
//         case 0:
//             month = "January";
//             break;
//         case 1:
//             month = "February";
//             break;
//         case 2:
//             month = "March";
//             break;
//         case 3:
//             month = "April";
//             break;
//         case 4:
//             month = "May";
//             break;
//         case 5:
//             month = "June";
//             break;
//         case 6:
//             month = "July";
//             break;
//         case 7:
//             month = "August";
//             break;
//         case 8:
//             month = "September";
//             break;
//         case 9:
//             month = "October";
//             break;
//         case 10:
//             month = "November";
//             break;
//         case 11:
//             month = "December";
//             break;
//     }

//     // display date
//     document.getElementById('date').innerHTML =
//         month + " " + day + ", " + year;

//     // display time
//     document.getElementById('clock').innerHTML =
//         hour + ":" + minute + ":" + second + " " + amPm;

//     var t = setTimeout(displayTime, 500);
// }

// /*
// * fix formatting for time under 10 seconds
// */
// function checkTimeFormat(i) {
//     // add zero in front of numbers < 10
//     if (i < 10) { i = "0" + i };
//     return i;
// }

// /*
// * convert seconds to H:M:S format
// */
// function getTimeFromSeconds(seconds) {

//     var hours = Math.floor(seconds / 3600);
//     var minutes = Math.floor((seconds - ((hours * 60) * 60)) / 60);
//     var seconds = seconds - ((minutes * 60) + ((hours * 60) * 60));

//     seconds = checkTimeFormat(seconds);

//     return hours + ':' + minutes + ':' + seconds;
// }

// /*
// * get the time since Jan 1 1970
// */
// function getTime() {
//     var t = new Date();
//     return t.getTime();
// }