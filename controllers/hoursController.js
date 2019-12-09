const hoursModel = require("../models/hoursModel.js");

function getHours(req, res) {
    console.log('controller | recieved a request for: ' + req.url);

    //var movieTitle = req.query.movieTitle;

    hoursModel.getAllHours(function (error, results) {
        if (!error)
            res.json(results);
    });
}

function postTimeIn(req, res) {
    var timeIn = req.body.timeIn;

    hoursModel.setTimeIn(function (error, results) {
        if (!error)
            res.json(results);
    });

    console.log('adding time-in: ' + timeIn);

    res.json({success:true});
}

function postTimeOut(req, res) {
    var timeOut = req.body.timeOut;

    hoursModel.setTimeOut(function (error, results) {
        if (!error)
            res.json(results);
    });

    console.log('adding time-out: ' + timeOut);

    res.json({success:true});
}

module.exports = {
    getHours: getHours,
    postTimeIn: postTimeIn,
    postTimeOut: postTimeOut
};