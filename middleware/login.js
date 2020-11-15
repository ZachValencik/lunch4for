module.exports = (() => {
    const asyncHandler = require('express-async-handler')
    const connection = require('../controller/connection');
    // let verifyAdmin = require('../controller/verify-admin-status')
    let login = asyncHandler(async (request, response) => {
        let username = request.body.username;
        let password = request.body.password;
        if (username && password) {
            connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], asyncHandler(async (error, results, fields) => {
                if (results.length > 0) {
                    console.log(results[0].admin)
                    request.session.loggedin = true;
                    if(results[0].admin === 1){
                        // console.log("I have been invoked", await verifyAdmin(results[0]))
                        request.session.admin = await verifyAdmin(results[0])
                    }

                    //this sets up information for the home page
                    request.session.username = username;

                    //this sends a json copy to the selected row aka user
                    request.session.account = results[0]

                    response.redirect('/home');
                } else {
                    // response.send('Incorrect Username and/or Password!');
                    request.session.valid = true
                    response.redirect("/login" )
                }
                response.end();
            }))
        } else {
            response.send('Please enter Username and Password!');
            response.end();
        }

        // let adStatus = await verifyAdmin(result)
        // next()
    })

    return login
})();