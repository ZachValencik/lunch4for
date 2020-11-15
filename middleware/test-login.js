module.exports = (() => {
    const asyncHandler = require('express-async-handler')
    const connection = require('../controller/connection');
    // let verifyAdmin = require('../controller/verify-admin-status')
    let login =
        (request, response) => {
            if( request.body == null){
                let username = request.body.username;
                let password = request.body.password;
        
            }
            if (username && password) {
                connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function (error, results, fields) {
                    if (results.length > 0) {
                        console.log(results[0].admin)
                        request.session.loggedin = true;


                        //this sets up information for the home page
                        request.session.username = username;

                        //this sends a json copy to the selected row aka user
                        request.session.account = results[0]

                        response.redirect('/home');
                    } else {
                        // response.send('Incorrect Username and/or Password!');
                        request.session.valid = true
                        response.redirect("/login")
                    }
                    response.end();
                });
            } else {
                response.send('Please enter Username and Password!');
                response.end();
            }
        };

    return login
})();