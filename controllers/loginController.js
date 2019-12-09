var crypto = require('crypto');
const { Pool, Client } = require('pg');

const connectionString = process.env.DATABASE_URL || "postgres://ta_user:ta_pass@localhost:5000/";

const pool = new Pool({ connectionString: connectionString });

/*
* user login
*/
function handleLogin(req, res) {
    var result = { success: false };

    // We should do better error checking here to make sure the parameters are present
    if (req.body.username == "admin" && req.body.password == "password") {
        req.session.user = req.body.username;
        result = { success: true };
    }

    res.json(result);
}

function verifyLogin(req, res, next) {
    if (req.session.user) {
        // They are logged in!

        // pass things along to the next function
        next();
    } else {
        // They are not logged in
        // Send back an unauthorized status
        var result = { success: false, message: "Access Denied" };
        res.status(401).json(result);
    }
}

// function saltHashPassword(userpassword) {  
//     var salt = genRandomString(16);     /** Gives us salt of length 16 */
//     var passwordData = hash(userpassword, salt);
//     console.log('UserPassword = ' + userpassword);
//     console.log('Passwordhash = ' + passwordData.passwordHash);
//     console.log('nSalt = ' + passwordData.salt);
// }

// function genRandomString(length) {
//     return crypto.randomBytes(Math.ceil(length / 2))
//         .toString('hex')        /** convert to hexadecimal format */
//         .slice(0, length);      /** return required number of characters */
// };

// function hash(password, 
//     ) {
//     var hash = crypto.createHmac('sha512', salt);   /** Hashing algorithm sha512 */
//     console.log('hash: ' + hash);
//     hash.update(password);
//     var value = hash.digest('hex');
//     return {
//         salt: salt,
//         passwordHash: value
//     };
// };

/*
* register nes user
* pass the new user information to the db
*/
function registerUser(req, res, callback) {
    var result = { success: false };

    console.log('Registering new user...');

    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;

    const sql = 'INSERT INTO users(username, password, email) VALUES($1, $2, $3) RETURNING *';
    const values = [username, password, email];

    // // callback
    // client.query(text, values, (err, res) => {
    //     if (err) {
    //         console.log(err.stack)
    //     } else {
    //         console.log(res.rows[0])
    //         // [username, password, email]
    //     }
    // });

    // // promise
    // client
    //     .query(text, values)
    //     .then(res => {
    //         console.log(res.rows[0])
    //         // [username, password, email]
    //     })
    //     .catch(e => console.error(e.stack))
    // // async/await
    // try {
    //     const res = pool.query(text, values)
    //     console.log(res.rows[0])
    //     // [username, password, email]
    // } catch (err) {
    //     console.log(err.stack)
    // }




    const params = [username, password, email];

    // // This runs the query, and then calls the provided anonymous callback function
    // // with the results.
    pool.query(sql, params, function (err, result) {
        //     // If an error occurred...
        if (err) {
            console.log("Error in query: ")
            console.log(err);
            callback(err, null);
        }

        //     // Log this to the console for debugging purposes.
        console.log("Found result: " + JSON.stringify(result.rows));


        //     // When someone else called this function, they supplied the function
        //     // they wanted called when we were all done. Call that function now
        //     // and pass it the results.

        // (The first parameter is the error variable, so we will pass null.)
        callback(null, result.rows);
    });




    // We should do better error checking here to make sure the parameters are present
    // if (req.body.username == "admin" && req.body.password == "password") {
    //     req.session.user = req.body.username;
    //     result = { success: true };
    // }

    res.json(result);
}

module.exports = {
    handleLogin: handleLogin,
    verifyLogin: verifyLogin,
    //hashPassword: saltHashPassword,
    register: registerUser
};