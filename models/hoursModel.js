const { pool } = require("pg");

const db_url = process.env.DATABASE_URL;

//console.log('db_url: ' + db_url);
//const pool = new pool({connectionString: db_url});

function getAllHours(callback) {
    console.log("hoursModel getAllHours()");

    const sql = "SELECT hoursIn, hoursOut FROM users WHERE username=$1::text";
    var params = [username];

    pool.query(sql, params, function (err, db_results) {

        if (err) {
            throw err;
        } else {
            console.log('back from the database with: ');
            console.log(db_results);

            const results = {
                success:true,
                hours:db_results.rows
            };

            callback(null, results);
        }
    });

}

function postTimeIn(callback) {
    console.log("hoursModel postTimeIn()");

    const sql = ''

}

function postTimeOut(callback) {
    console.log("hoursModel postTimeOut()");

}

module.exports = {
    getAllHours: getAllHours,
    postTimeIn: postTimeIn,
    postTimeOut: postTimeOut
};