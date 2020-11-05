let createUser = require('../controller/create-user');
let signupVerify = require('../controller/create-controller')
const asyncHandler = require('express-async-handler')
module.exports = (() => {
    'use strict';
    let app = require('express').Router();
    let connection = require('../controller/connection')
    
    app.get('/', function (request, response) {
        if (request.session.loggedin) {
            response.redirect("/home")
        } else {
            response.redirect("/login")
        }
    });


    //log in page
    app.get('/login', function (request, response) {
        if (request.session.valid){
            request.session.valid = null;
            response.render('login', {wrongInfo : true })
        }else{
            response.render('login')
        }
    })
    //sign up page ZACH WAS HERE IN HIS OWN BRANCH
    //INSERT INTO `accounts` (`id`, `username`, `password`, `email`) VALUES (1, 'test', 'test', 'test@test.com');
    app.get('/signup', function (request, response) {
        // console.log(request.session.invalid, request.session.valid)
        if (!request.session.loggedin) {
            if (request.session.invalid || request.session.valid) {
                // console.log("stage 3")
                if (request.session.invalid && request.session.valid) {
                    request.session.invalid = null;
                    request.session.valid = null;
                    // console.log("both inputs are wrong")
                    response.render('signup', {
                        invalidEmail: true,
                        invalidPassword: true
                    })
                } else if (request.session.invalid) {
                    request.session.invalid = null;
                    // console.log("email exist")
                    response.render('signup', {
                        invalidEmail: true
                    })
                } else if (request.session.valid) {
                    request.session.invalid = null;
                    // console.log("password do not match")
                    response.render('signup', {
                        invalidPassword: true
                    })
                }
            } else response.render('signup')
        }
        else {
            response.redirect("/logout")
        }
    });
    //connected to the log in page
    //verify if user exist
    app.post('/auth', function (request, response) {
        let username = request.body.username;
        let password = request.body.password;
        if (username && password) {
            connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function (error, results, fields) {
                if (results.length > 0) {
                    request.session.loggedin = true;
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
            });
        } else {
            response.send('Please enter Username and Password!');
            response.end();
        }
    });

    app.post('/create', asyncHandler(async (request, response) => {
        let userInput = await signupVerify(request.body.email, request.body.password, request.body.passwordRetype, request, response)
        userInput;
        if (userInput) {
            await createUser(userInput);
            response.redirect(307, '/success');
        }
    }))

    app.get('/home', function (request, response) {
        if (request.session.loggedin) {
            let info = request.session
            response.render('home', { info })
        } else {
            response.send('Please login to view this page!');
        }
        response.end();
    });

    //settings
    app.get("/account", (request, response) => {
        if (request.session.loggedin) {
            response.render("account")
        } else {
            response.redirect("/restricted")
        }
        response.end();
    })


    //profile
    app.get("/users", (request, response) => {
        if (request.session.loggedin) {
            response.redirect(`/users/${request.session.username}`)
        } else {
            //response.redirect("Page Not Found")
            response.redirect("/restricted")
        }
        response.end();
    })

    app.get("/users/:username", (request, response) => {
        let username = request.params.username;
        let prefix = ""
        //your profile
        if (request.session.loggedin && request.session.username === username) {
            prefix = "You are viewing your profile, "
            response.render('profile', { username, prefix })
        }
        //your profile to other people
        else if (request.session.loggedin && request.session.username !== username) {
            prefix = "You are viewing this person's public page => ";
            response.render('profile', { username, prefix })

        } else {
            response.redirect("/restricted")
        }
        response.end();
    })



    //this is the log out page /function
    app.get('/logout', (request, response) => {
        if (request.session.loggedin) {
            request.session.loggedin = false;
            response.redirect("/login")
        } else {
            response.redirect("/restricted")
        }
        response.end();
    })
    app.post('/success', (request, response) => {
        request.session.valid = null;
        request.session.invalid = null;
        response.render("success")
        response.end();
    })
    //this should be applied to the else statements if the person is not logged in or what not
    app.get('/restricted', (request, response) => {
        response.send("Permision denied")
        response.end();
    })



    return app;
})();