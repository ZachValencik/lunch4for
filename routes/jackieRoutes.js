const { response } = require('express');
//async
const asyncHandler = require('express-async-handler');
//model
const { changeUser } = require('../model/connection');
const accounts_model = require('../model/accounts_model');
const MeetingModel = require('../model/meeting_model')
//middleware, checks if you're signed in
let user_session = require("../middleware/logged-status");
//controller
let signupVerify = require('../controller/account_verify')
const MeetingController = require('../controller/meeting_controller')
const account_controller = require('../controller/account_controller');

const bcrypt = require('bcryptjs'); // this makes it so you can get the hashed and salted password
const { urlencoded } = require('body-parser');
module.exports = (() => {
    //'use strict';
    let app = require('express').Router();
    let connection = require('../model/connection')
    app.get("/account",user_session, (request, response) => {
           response.redirect(`/account/${request.session.user_id}`);

        });
    app.get("/account/:id",user_session, asyncHandler(async function(request,response){
        let info = await accounts_model.findOne({id : request.session.user_id})
        console.log(request.session.user_id)
        response.render("account",{info});
    }));
    const bodyParser = require('body-parser') 
    app.use( bodyParser.urlencoded({extended:true}));
   
    app.post('/account',user_session, asyncHandler(async function(request,response) {
        let info = await accounts_model.findOne({id : request.session.user_id})
       response.render("account-edit",{info});
    }))
    app.post("/account/update", user_session,asyncHandler(async function(request,response) {
        let info = await accounts_model.findOne({id : request.session.user_id})
        if (request.body.password == "") {
            request.body.password = info.password
        }
        //ask zach to how to encrypt the changed password and also how to decrypt when a user is logged in
        let update_info = {
            username: request.body.username,
            email: request.body.email,
            password: await bcrypt.hash(request.body.password,10) // Here is is jackie
        }
        if(info) {
            await accounts_model.update(update_info, request.session.user_id)
        }
        console.log(info.password);
        //response.send(update_info);
        response.redirect("/account");
    }));
            
    app.get('/meeting/leader/', (request, response) => {
       response.render('meeting-leader');
    });
    var urlencodedParser = bodyParser.urlencoded({ extended: false });
    app.post('/meeting/leader/summary', urlencodedParser, function(request,response) {
        console.log(request.body);

        var sql = "INSERT INTO meeting_summary VALUES ('"+ request.body.summary_date +"', '"+ request.body.summary_time+"', '"+ request.body.summary_comments +"')";
        connection.query(sql, function (err) {
            if (err) throw err;
            console.log("summary entered");
        });
    //response.send(`DATE:${request.body.summary_date}  TIME:${request.body.summary_time}  COMMENTS:${request.body.summary_comments}`);
    response.redirect("/meeting");
});

    return app;
    
})();