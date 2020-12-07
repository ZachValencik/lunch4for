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
            //gets the users info from profile table
            let userInfo = await MeetingController.getUserInfo(request.session.account.id);

            if (userInfo) {
                const groupData = await MeetingController.getGroupData(userInfo.Team_Id)
                //console.log('Got list of everyone in same group: ', groupData);

                const meetingData = await MeetingController.getMeetingData(userInfo.Team_Id);
                //console.log('Got the meetingData: ', meetingData);

                let leader = false;
                if(userInfo.Leader == 1){
                    //if user is leader then it displays after lunch summary button in meeting page
                    leader = true;
                }
                response.render('meeting', { info, leader, Group: groupData, Meeting: meetingData });
            } 
        } else{
            response.redirect('/login');
        }

    }));

    app.get('/meeting/updateInfo', asyncHandler(async (request, response) => {
        let info = request.session;
        let userInfo = await MeetingController.getUserInfo(request.session.account.id);
        const meetingData = await MeetingController.getMeetingData(userInfo.Team_Id);
        console.log(meetingData);
    
        if(request.session.loggedin){
            response.render('updateMeetingInfo', { info, TeamId: userInfo.Team_Id, Meeting: meetingData });
        } else{
            response.redirect('/login');
        }

    }));

    app.post("/updateMeeting", asyncHandler(async (request, response) => {
        // console.log(request.signedCookies.profile_email)
        // await ProfileController.createDefault(request.body.email)
        //to do => switch to useing classes for generating objects
        let meeting_package = {
            Meet_Date: request.body.meeting_date,
            Meet_Time: request.body.meeting_time,
            Meet_Location: request.body.meeting_location
        }

        const teamID = request.body.team_id
        console.log("team id = ", teamID);
        const userID = await AccountController.getID_UN(request.session.username)
        if (meeting_package) {

            await MeetingModel.update(meeting_package, teamID)
            // newProfile(meeting_package)
        }
        response.redirect("/meeting")
        // response.json(meeting_package)

    }))

    return app;
})();