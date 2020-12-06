//this is used to handle all asynchrounous functions | an alternative to try catch 
const asyncHandler = require('express-async-handler')
//model
const ProfileModel = require('../model/profile_model')
const UserModel = require("../model/accounts_model")
const MeetingModel = require('../model/meeting_model')
//controller
const AccountController = require('../controller/account_controller')
const ProfileController = require('../controller/profile_controller')
const AdminController = require('../controller/admin_controller')
const MeetingController = require('../controller/meeting_controller')
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
    
    //get meeting page and populate table with meetingData
    app.get('/meeting', asyncHandler(async (request, response) => {
        let info = request.session;
    
        if(request.session.loggedin){
            let tId = await MeetingController.getMeetingID(request.session.account.id);
            if (tId) {
                const meetingData = await MeetingController.getMeetingData(tId.Team_Id)
                //console.log('Meeting Data: ', meetingData);
                let leader = false;
                if(tId.Leader == 1){
                    //if user is leader then it displays after lunch summary button in meeting page
                    leader = true;
                }
                response.render('meeting', { info, leader, Group: meetingData });
            } 
        } else{
            response.redirect('/login');
        }

    }));

    return app;
})();