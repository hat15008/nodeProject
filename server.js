const express = require('express');
const app = express();
const path = require("path");
require('dotenv').config();

const hoursController = require('./controllers/hoursController.js');

// use port specified by Heroku/server OR use port 5000
const port = process.env.PORT || 5000;

app.use(express.json());                                    // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true }));            // to support URL-encoded bodies
app.use(express.static(path.join(__dirname, "public")));    // makes public a publicly accessable folder

app.get('/hours', hoursController.getHours);
app.post('/time_in', hoursController.postTimeIn);
app.post('/time_out', hoursController.postTimeOut);

/*
*   POST the new time instance(clock-in/clock-out)
*/
function addTime(req, res) {
    console.log('adding new time...');

    const time = req.body.time;
    const date = req.body.date;
    const day  = req.body.day;

    console.log('new time time: ' + time)
    console.log('new time date: ' + date)
    console.log('new time day: '  + day)

    const result = { success: true };
    res.json(result);
}

/*
*   GET the timeSheet(hours within given dates) by ID
*/
function getTimeSheet(req, res) {
    console.log('getting timeSheet details...');

    // get the id from the URL using /timeSheet?id=2
    //const id = req.query.id;

    // get the id from the URL using /timeSheet/2
    const id = req.params.workerId;

    console.log('getting details for id: ' + id);

    const timeSheetDetails = { id: id, name: "undefined" };
    res.json(timeSheetDetails);
}


function getList(req, res) {
    console.log('recieved a request for: ' + req.url);

    const productList = [
        { id: 1, name: "Lindor Truffle" },
        { id: 2, name: "Hershey's" },
        { id: 3, name: "Skor", }
    ];

    res.json(productList);
}

app.listen(port, () => {
    console.log('Listening on port: ' + port);
});

