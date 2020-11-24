let createUser = require('../controller/create-user');
let signupVerify = require('../controller/create-controller')
const asyncHandler = require('express-async-handler')
let user_session = require("../middleware/logged-status");
let auth = require("../middleware/login")
let clear = require("../util/clear");
let profileValidator = require('../controller/profile_validator')
let options = require('../util/select_options');
const { request, response } = require('express');
let setID = require('../util/set_profile_id')
//this function returns the total # of users that are either active or inactive
let activeChecker = require('../controller/get_admin_data')
module.exports = (() => {
    'use strict';
    let app = require('express').Router();
    let connection = require('../controller/connection')

    app.get('/', function (request, response) {
        console.log(request.signedCookies.email)
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
            let input = { type: request.signup.invalid }
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


    //this route is used to create an account
    //it is the current action for /signup form
    //it first takes the given information and verifies that it does not exist already
    //then it creates theuser with the createUser() function 
    //it will then render the create-profile page which will contain a form to which they will fill out aditional information 
    //such as name, department , and a place to add a brief summary about themselves
    //I am debationg on wether or not to add a profile pic, in which they have an option to choose from presaved pictures as their own almost like netflix

    app.post('/create', asyncHandler(async (request, response) => {
        let userInput = await signupVerify(request.body.email, request.body.password, request.body.passwordRetype, request, response)
        userInput;
        if (userInput) {
            await createUser(userInput);
            response.render('create-profile', { variables: options.selectOption }) // the second part populates the select box
        }
    }))


    //this will be the action for the create-profile page
    //it will store the information as a json file and place it inside the profile table 
    const newProfile = require('../controller/new-profile')
    app.post('/profile-create', asyncHandler(async (request, response) => {
        console.log(request.signedCookies.profile_email)
        //to do => switch to useing classes for generating objects
        let profile_package = {
            Profile_id: await setID(request.signedCookies.profile_email),
            Name: request.body.profile_name,
            Team_Id: 1000,
            Description: request.body.profile_desc,
            Department: request.body.department
        }
        if (newProfile) {
            newProfile(profile_package)
        }

        response.json(profile_package)
    }))


    //this is a middleware function that loads the admin homepage depending if they are admin other wise render the default page
    let admin_homepage = asyncHandler(async (request, response, next) => {

        if (request.session.admin) {
            console.log("activeChecker(1) =", activeChecker(0))
            let current_active_members = {
                active: await activeChecker(1),
                inactive: await activeChecker(0)
            }
            // console.log(request.session.account)
            // console.log(current_active_members.active)
            response.render('admin-homepage', current_active_members)
            // response.send("You are admin")
        } else {
            return next()
        }
    })

    app.get('/home', user_session, admin_homepage, function (request, response) {
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


    //profile
    app.get("/users", user_session, (request, response) => {
        response.redirect(`/users/${request.session.username}`)

    })

    let getProfileId = require('../model/get_profile_id')
    let getProfileData = require('../model/get_profile_data')

    //render profile
    app.get("/users/:username", asyncHandler(async (request, response) => {
        let username = request.params.username;
        let prefix = ""
        // console.log(await getProfileId(username))
        // let tempId = await getProfileId(username)
        // console.log(await getProfileData(tempId))
        //your profile
        if (request.session.loggedin && request.session.username === username) {
            prefix = "You are viewing your profile, "
            let tempId = await getProfileId(username)
            let profileData = await getProfileData(tempId)
            console.log(profileData)
            response.render('profile', { profileData })
        }
        //your profile to other people
        else if (request.session.loggedin && request.session.username !== username) {
            if (await profileValidator(username)) {
                let tempId = await getProfileId(username)
                // console.log(await getProfileData(tempId))
                let profileData = await getProfileData(tempId)
                prefix = "You are viewing this person's public page => ";
                response.render('profile', { profileData })
            }
            else {
                //make this pretty
                response.status(400).send("This person does not exist")
            }

        } else {
            response.redirect("/restricted")
        }
        response.end();
    }))

    let admin_session = require("../middleware/admin_session")
    app.get("/table", admin_session, (request, response) => {
        connection.query('SELECT * FROM accounts', function (error, results, fields) {
            response.render("table", { users: results })
        })
    })

    app.get("/admin-list", admin_session, (request, response) => {
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