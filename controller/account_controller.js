const { request, response } = require("express");
const { resolve } = require("path");
const AccountModel = require("../model/accounts_model")
const HttpException = require('../util/HttpException.utils');
let { verifyAdminStatus } = require('./admin_controller')
const bcrypt = require('bcryptjs')
class AccountController {
    //get id with email
    getID = async (email) => {

        const data = await AccountModel.findOne({ email: email })

        if (data) {
            return data.id
        }

    }
    //get id with username
    getID_UN = async (username) => {

        const data = await AccountModel.findOne({ username: username })

        if (data) {
            return data.id
        }

    }
    //ger username with id
    getUserById = async (input_id) => {
        const user = await AccountModel.findOne({ id: input_id });
        if (!user) {
            throw new HttpException(404, 'User not found');
        }
        return user.id
    }
    getUsernameById = async (input_id) => {
        const user = await AccountModel.findOne({ id: input_id });
        if (!user) {
            throw new HttpException(404, 'User not found');
        }
        return user.username
    }
    //check if user exist with username
    userExist = async (request, response, next) => {
        let username = request.params.username;
        const user = await AccountModel.findOne({ username: username });
        if (!user) {
            // throw new HttpException(404, 'User not found');
            response.send("this user does not exist") //replace with a dedicated page
        }else{

            return next()
        }
    }
    
    //this replaces the login.js file 
    //handles authentication 
    auth = async (request, response, next) => {
        const email = request.body.email + '@aurora.edu';
        const password = request.body.password;

        if (email || password) {
            const user = await AccountModel.findOne({ email: email })
            console.log("login user info: ",user)
            if (user && (await bcrypt.compare(password, user.password))) {
                request.session.loggedin = true;
                if (user.admin === 1) {
                    console.log("I have been invoked", user)
                    // request.session.admin = await verifyAdminStatus(user)
                     request.session.admin = true
                }
                console.log("Admin status: ",request.session.admin)
                //this sets up information for the home page
                request.session.username = user.username;
                if(!request.session.user_id){
                    console.log(user.id)
                    request.session.user_id = user.id;
                }
                console.log(request.session.user_id)

                //this sends a json copy to the selected row aka user
                request.session.account = user
                return next();

            } else {
                // response.send('Incorrect Username and/or Password!');
                request.session.valid = true
                response.redirect("/login")
            }
        }else {
            
            response.send('Please enter Username and Password!');
            return response.sendStatus(401); 
            // response.end();
        }


    }

}

module.exports = new AccountController;