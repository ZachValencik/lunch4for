//this is used to handle all asynchrounous functions | an alternative to try catch 
const asyncHandler = require('express-async-handler')
//model
const ProfileModel = require('../model/profile_model')
const UserModel = require("../model/accounts_model")
//controller
const AccountController = require('../controller/account_controller')
const ProfileController = require('../controller/profile_controller')
const AdminController = require('../controller/admin_controller')
let signupVerify = require('../controller/account_verify')

//middleware
let user_session = require("../middleware/logged-status");
let signup_handler = require("../middleware/signup_route_handler")
// let auth = require("../middleware/login")
// let admin_session = require("../middleware/admin_session")
// const loggedStatus = require('../middleware/logged-status')

let clear = require("../util/clear");
let options = require('../util/select_options'); //used for the dropdown menu for profile

module.exports = (() => {
    'use strict';
    let app = require('express').Router();
    // let connection = require('../model/connection')

    app.get('/', asyncHandler(async function (request, response) {
        response.cookie('signup', { both: false, email: false, password: false }, { signed: true })
        if (request.session.loggedin) {
            response.redirect("/home")
        } else {
            response.redirect("/login")
        }
    }));


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
    //the cookies are used to keep track of any errors
    app.get('/signup', signup_handler, asyncHandler(async (request, response) => {

        if (!request.session.loggedin) {
            response.cookie('signup', { both: false, email: false, password: false }, { signed: true })
            let input = { type: request.signup.invalid }
            clear()
            response.render('signup', input)
        }
        else {
            response.redirect("/logout")
        }
    }));

    //the middleware authorizes and then redirect to home page
    app.post('/auth', AccountController.auth, (request, response) => {
        // console.log(request.session.user_id)
        response.redirect('/home');
    });


    //this route is used to create an account
    //it is the current action for /signup form
    //it first takes the given information and verifies that it does not exist already
    //then it creates theuser with the createUser() function 
    //it will then render the create-profile page which will contain a form to which they will fill out aditional information 
    //such as name, department , and a place to add a brief summary about themselves
    //I am debationg on wether or not to add a profile pic, in which they have an option to choose from presaved pictures as their own almost like netflix
    let profileFormatter = require('../util/profile_data')
    
    app.post('/create', asyncHandler(async (request, response) => {
        response.clearCookie('signup')
        // console.log("create level", request.signedCookies)
        let userInput = await signupVerify(request.body.email, request.body.password, request.body.passwordRetype, request, response)
        userInput;
        if (userInput) {
            await UserModel.create(userInput)
            let newID = await UserModel.findOne({ email: userInput.email })
            // console.log('this is the', newID.id)
            await ProfileController.createDefault(newID.id)
            response.render('create-profile', { variables: options.selectOption }) // the second part populates the select box
            // await createUser(userInput);
        }
    }))

    app.get('/test', (request, response) => {
        response.render('create-profile', { variables: options.selectOption })
    })


    //this will be the action for the create-profile page
    //it will store the information as a json file and place it inside the profile table 
    // const newProfile = require('../controller/old_new-profile')
    app.post('/profile-create', asyncHandler(async (request, response) => {
        // console.log(request.signedCookies.profile_email)
        // await ProfileController.createDefault(request.body.email)
        //to do => switch to useing classes for generating objects
        let profile_package = {
            Name: request.body.profile_name,
            Team_Id: 1000,
            Description: request.body.profile_desc,
            Department: request.body.department
        }
        if (profile_package) {
            ProfileModel.update(profile_package, await AccountController.getID(request.signedCookies.profile_email))
            // newProfile(profile_package)
        }
        // response.redirect(307 , '/success')
        response.json(profile_package)
    }))
    //move to admin-controller file
    //this is a middleware function that loads the admin homepage depending if they are admin other wise render the default page
    let admin_homepage = asyncHandler(async (request, response, next) => {

        if (request.session.admin) {
            // console.log("activeChecker(1) =", activeChecker(0))
            let current_active_members = await AdminController.getActiveUsers()
            let ad = true
            // console.log(current_active_members)
            // console.log(request.session.account)
            // console.log(current_active_members.active)
            response.render('admin-homepage', {current_active_members , ad})
            // response.send("You are admin")
        } else {
            return next()
        }
    })
    //the home page route
    app.get('/home', user_session, admin_homepage, function (request, response) {
        let info = request.session
        let ad = false
        
        if (request.session.admin == true) {
            ad = true
        }

        response.render('home', { info, ad })
    });


    //profile
    app.get("/users", user_session,  asyncHandler(async (request, response) => {
        let uname =  await AccountController.getUsernameById(request.session.user_id)
        console.log(uname)
        response.redirect(`/users/${uname}`)

    }))

    app.post("/users", user_session,  asyncHandler(async (request, response) => {
        let uname =  await AccountController.getUsernameById(request.session.user_id)
        response.redirect(307, `/users/${uname}`)

    }))

    // let getProfileId = require('../model/get_profile_id')
    // let getProfileData = require('../model/get_profile_data')

    //render profile
    //create profile
    app.post("/users/:username", asyncHandler(async (request, response) => {
        let username = request.params.username;
        let uname =  await AccountController.getUsernameById(request.session.user_id)
        // console.log('this stored id is: ', request.session.userID)
        let tempId = request.session.user_id
        if (request.session.loggedin && uname === username) {
            if (tempId) {
                const profileData = await ProfileController.getProfileData(tempId)
                // console.log(profileData)
                response.render('update-profile', { variables: options.selectOption, profileData })
            }
        }
        // response.send("hey")
    }))
    app.post("/update", asyncHandler(async (request, response) => {
        // console.log(request.signedCookies.profile_email)
        // await ProfileController.createDefault(request.body.email)
        //to do => switch to useing classes for generating objects
        let profile_package = {
            Name: request.body.profile_name,
            Description: request.body.profile_desc,
            Department: request.body.department
        }
        const userID = request.session.user_id
        if (profile_package) {

            await ProfileModel.update(profile_package, userID)
            // newProfile(profile_package)
        }
        response.redirect("/users")
        // response.json(profile_package)

    }))
    //this is an array of middleware functions that is used for the profile page
    let userMiddleware = [user_session, AccountController.userExist, ProfileController.profileExist, ProfileController.profileOwnership]
    app.get("/users/:username", userMiddleware, asyncHandler(async (request, response) => {
    }))

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