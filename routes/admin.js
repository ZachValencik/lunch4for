const AccountModel = require('../model/accounts_model');
const asyncHandler = require('express-async-handler');
const AdminController = require('../controller/admin_controller')
const { response, request } = require('express');
module.exports = (() => {

    //these are the routes for the admin pages
    let app = require('express').Router();

    app.get('/admin',  AdminController.admin_session,(request, response) => {

        response.send("This is the admin page")
    }
    )

    
    app.get("/admin/users", AdminController.admin_session, asyncHandler(async  (request, response) => {
        const allUsers = await AccountModel.find()

        if(allUsers){
            console.log(allUsers)
            response.render("table", { users: allUsers })
        }

    }))

    app.get("/admin/admins", AdminController.admin_session, asyncHandler(async  (request, response) => {
        const allUsers = await AccountModel.find({admin : 1})

        if(allUsers){
            console.log(allUsers)
            response.render("table", { users: allUsers })
        }

    }))

    return app
})();