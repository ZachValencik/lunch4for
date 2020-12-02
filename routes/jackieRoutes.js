const { changeUser } = require('../model/connection');
let signupVerify = require('../controller/account_verify')
//middleware, checks if you're signed in
let user_session = require("../middleware/logged-status");
const asyncHandler = require('express-async-handler');

const { response } = require('express');
const account_controller = require('../controller/account_controller');
const accounts_model = require('../model/accounts_model');

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
    app.post("/account/update",user_session,asyncHandler(async function(request,response) {
        let info = await accounts_model.findOne({id : request.session.user_id})
        if (request.body.password == "") {
            request.body.password = info.password
        }
        //ask zach to how to encrypt the changed password and also how to decrypt when a user is logged in
        let update_info = {
            username: request.body.username,
            email: request.body.email,
            password: request.body.password
        }
        if(info) {
            await accounts_model.update(update_info, request.session.user_id)
        }
        console.log(info.password);
        response.send(update_info);
    }));
    return app;
    
})();