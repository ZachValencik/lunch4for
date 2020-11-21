let createUser = require('../controller/create-user');
let signupVerify = require('../controller/create-controller')
const asyncHandler = require('express-async-handler')
let user_session = require("../middleware/logged-status");
let auth = require("../middleware/login")
let clear = require("../util/clear");
const { request, response } = require('express');

// let verifyAdmin = require('../controller/verify-admin-status')
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
        if (request.session.valid) {
            request.session.valid = null;
            response.render('login', { wrongInfo: true })
        } else {
            response.render('login')
        }
    })
    //sign up page
    //INSERT INTO `accounts` (`id`, `username`, `password`, `email`) VALUES (1, 'test', 'test', 'test@test.com');

    let signup_handler = require("../middleware/signup_route_handler")
    app.get('/signup', signup_handler, asyncHandler(async (request, response) => {
        // console.log(request.session.invalid, request.session.valid)
        if (!request.session.loggedin) {
            let input = { type: request.signup.invalid}
            clear()
            response.render('signup', input)
            // console.log(request.signup.invalid)
            // console.log("email: ", request.signup.email, request.signup.invalid.invalidEmail)
            // console.log("password: ", request.signup.password, request.signup.invalid.invalidPassword)
            // console.log("both: ", request.signup.both, request.signup.invalid.invalidEmail, request.signup.invalid.invalidPassword)
            // console.log("input", input)
        }
        else {
            response.redirect("/logout")
        }
    }));
    //the original code inside the route was outsourced to a middleware file 
    

    app.post('/auth', auth, (request, response) => {
        response.redirect('/home');
    });



    app.post('/create', asyncHandler(async (request, response) => {
        let userInput = await signupVerify(request.body.email, request.body.password, request.body.passwordRetype, request, response)
        userInput;
        if (userInput) {
            await createUser(userInput);
            response.redirect(307, '/success');
        }
    }))

    //this function returns the total # of users that are either active or inactive
    let activeChecker = require('../controller/get_admin_data')
    //this is a middleware function that loads the admin homepage depending if they are admin other wise render the default page
    let admin_homepage = asyncHandler(async  (request , response, next) => {

        if (request.session.admin){
            console.log("activeChecker(1) =", activeChecker(0))
            let current_active_members = {
                active : await activeChecker(1),
                inactive :  await activeChecker(0)
            }
            // console.log(request.session.account)
            // console.log(current_active_members.active)
            response.render('admin-homepage', current_active_members)
            // response.send("You are admin")
        } else{
            return next()
        }
    })

    app.get('/home', user_session,admin_homepage, function (request, response) {
        // console.log(request.login.mismatch)
        // console.log(request.signup.password)
        let info = request.session
        let ad = false
        // console.log("This is the sessions: ", request.session.loggedin)
        // console.log("This is the admin: ", request.session.admin)
        if (request.session.admin == true) {
            ad = true
        }
        response.render('home', { info, ad })

    });

    //settings
    //app.get("/account", user_session, user_session, (request, response) => {

        //response.render("account")

    //})


    //profile
    app.get("/users", user_session, (request, response) => {
        response.redirect(`/users/${request.session.username}`)

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

    let admin_session = require("../middleware/admin_session")
    app.get("/table", admin_session, (request, response) => {
        connection.query('SELECT * FROM accounts', function (error, results, fields) {
            response.render("table", { users: results })
        })
    })

    app.get("/admin-list", admin_session,(request, response) => {
            connection.query('SELECT * FROM admin', function (error, results, fields) {
                // console.log(res)
                response.render("admin-table", { users: results })
                //  response.send(fields)
            })

    })


    //this is the log out page /function
    app.get('/logout', user_session, (request, response) => {
            request.session.loggedin = false;
            request.session.destroy();
            response.redirect("/login")
    })

    app.post('/success', (request, response) => {
        request.session.valid = null;
        request.session.invalid = null;
        response.render("success")
        response.end();
    })
    //this should be applied to the else statements if the person is not logged in or what not
    app.get('/restricted', (request, response) => {
        response.status(400).send("Permision denied") //make a pug file
        response.end();
    })



    return app;
})();