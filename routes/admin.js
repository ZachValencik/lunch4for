const AccountModel = require('../model/accounts_model');
const asyncHandler = require('express-async-handler');
const AdminController = require('../controller/admin_controller')
const { response, request } = require('express');
const admin_model = require('../model/admin_model');
module.exports = (() => {

    //these are the routes for the admin pages
    let app = require('express').Router();
    //this is going to be the dashboard
    //the log in page will redirect you here if your an admin
    //pie chart of all active users

    app.get('/admin', AdminController.admin_session, (request, response) => {

        response.send("This is the admin page")
    }
    )

    //this will display a list of all users
    //maybe give the ability to activate or deactivate
    app.get("/admin/users", AdminController.admin_session, asyncHandler(async (request, response) => {
        const allUsers = await AccountModel.find({ admin: 0 })

        if (allUsers) {
            response.render("table", { users: allUsers })
        }

    }))

    app.get("/admin/edit", AdminController.admin_session, asyncHandler(async (request, response) => {
        const allUsers = await AccountModel.find({ admin: 0 })

        allUsers.forEach(
            (user) => {
                user.active = Boolean(user.active)
            }
        )
        // console.log(allUsers)
        if (allUsers) {
            response.render("user_table_edit", { users: allUsers })
        }

    }))

    ///save-user-settings
    const formatActivity = require('../util/formatActivity')
    app.post("/save-user-settings", asyncHandler(async (request, response) => {

        // console.log(request.body.id)
        console.log("body>>>",request.body)
        // await AdminController.updateActivity(request.body.id , request.body.active)
        let list = formatActivity(request.body.id, request.body.active)
        list.forEach( (user) =>{
             AccountModel.update({active : parseInt(user.active)}, user.id)
        })
        response.redirect('/redirect-to-users')
        // response.send(list)


    }))
    
    //this is used to give time to update the DB  otherwise it will load outdate data
    app.get('/redirect-to-users', (request, response) => {
        response.redirect('/admin/users')
    })
    //this will display all admins 
    //give the ability to become or strip admin based on their role
    //full admin --- give / take admin level | manipulate users
    //owner -- same are 
    //super user --- manipulate users | view other admins (no control)
    //regular user -- use the website as intended



    app.get("/admin/admins", AdminController.admin_session, asyncHandler(async (request, response) => {

        const allUsers = await AccountModel.find({ admin: 1 })
        // await admin_model.create({A_Id: 2222, Account_Id: 2222 , Role: 'Admin' })
        
        if (allUsers) {

        // allUsers.forEach( asyncHandler(async (user)=>{
        //         console.log(user)
        //         await admin_model.create({A_Id: user.id , Account_Id: user.id , Role: 'Admin' })
        //     }))


            // for( const user of allUsers){
            //     console.log("loop", user)
            //     let input = {A_Id: user.id, Account_Id: user.id , Role: 'Admin' }
            //     // console.log(id)
            //     await admin_model.create(input)
            // }
            // console.log(allUsers)
            response.render("table-admin", { users: allUsers })
        }

    }))
    app.get("/admin/alter", AdminController.admin_session, asyncHandler(async (request, response) => {
        const allUsers = await AccountModel.find({ admin: 1 })

        allUsers.forEach(
            (user) => {
                user.admin = Boolean(user.admin)
            }
        )
        // console.log(allUsers)
        if (allUsers) {
            response.render("admin_table_edit", { users: allUsers })
        }

    }))

    app.get("/admin/add", AdminController.admin_session, asyncHandler(async (request, response) => {
        const allUsers = await AccountModel.find({ admin: 0 })

        allUsers.forEach(
            (user) => {
                user.admin = Boolean(user.admin)
            }
        )
        // console.log(allUsers)
        if (allUsers) {
            response.render("user_to_admin", { users: allUsers })
        }
    }))

    app.post("/add-admin", asyncHandler(async (request, response) => {

        // console.log(request.body.id)
        console.log("body>>>",request.body)
        // await AdminController.updateActivity(request.body.id , request.body.active)
        let list = formatActivity(request.body.id, request.body.admin)
        await list.forEach( (user) =>{
            AccountModel.update({admin : parseInt(user.active)}, user.id)
            // if(parseInt(user.active) > 0){
            //       AdminController.createAdmin(user.id)
            //     // console.log(temp)
            // }
        })
        response.redirect('/admin/admins')
        // response.send(list)


    }))

    

    // const formatActivity = require('../util/formatActivity')
    app.post("/save-admin-settings", asyncHandler(async (request, response) => {

        // console.log(request.body.id)
        console.log("body>>>",request.body)
        // await AdminController.updateActivity(request.body.id , request.body.active)
        let list = formatActivity(request.body.id, request.body.admin)
        list.forEach( (user) =>{
             AccountModel.update({admin : parseInt(user.active)}, user.id)
        })
        response.redirect('/admin/admins')
        // response.send(list)


    }))

    const MeetingModel = require('../model/meeting_model')

    app.get("/admin/teams", AdminController.admin_session, asyncHandler(async (request, response) => {
        const allUsers = await MeetingModel.find({ Activate: 1 })
        // await admin_model.create({A_Id: 2222, Account_Id: 2222 , Role: 'Admin' })
        
        if (allUsers) {

            response.render("table-team", { users: allUsers })
        }

    }))
const ProfileModel = require('../model/profile_model')

    app.get("/admin/profile", AdminController.admin_session, asyncHandler(async (request, response) => {
        const allUsers = await ProfileModel.find()
        // await admin_model.create({A_Id: 2222, Account_Id: 2222 , Role: 'Admin' })
        
        if (allUsers) {

            response.render("table-profile", { users: allUsers })
        }

    }))

    return app
})();