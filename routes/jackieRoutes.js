const { changeUser } = require('../controller/connection');
let signupVerify = require('../controller/create-controller')
const asyncHandler = require('express-async-handler')

module.exports = (() => {
    //'use strict';
    let app = require('express').Router();
    let connection = require('../controller/connection')
    app.get('/jackie', function (request, response) {
        response.send('Hello Jackie');
    })
    app.get("/account", (request, response) => {
        if (request.session.loggedin) {
            console.log("This is the jackieroutes",request.accounts.info);
            let info = request.accounts.info
            response.render("account",{info});
        } else {
            response.redirect("/restricted")
        }
        response.end(); 
             
        });
    app.get("/accounts/:id",function(req,res){

        connection.query("SELECT * FROM accounts WHERE id=?",[req.params.id],(err,results,fields)=> {
            if(!err) {
            
            req.accounts.info = JSON.stringify(results[0]);

            //request.accounts = results[0];
            console.log("This is the login accounts:",req.accounts.info);
            res.json(req.accounts.info)
            } else {
            consol.log(err);
            }
        })
    });
    const bodyParser = require('body-parser') 
    app.use( bodyParser.urlencoded({extended:true}));
   //app.post("/postChanges", function(request,response) {
     //  response.send(`USERNAME:${request.body.username} EMAIL:${request.body.email} PASSWORD:${request.body.password}`)  
      //});
    app.post('/update', function(req,res) {
        //let username = request.body.username;
        //let email = request.body.email;
        //let password = request.body.password;
        //let id = request.body.id;
        console.log(req.body.username);
        //console.log(req.body.email);
        //console.log(req.body.password);

       connection.query("UPDATE accounts SET username='"+req.body.username+"'WHERE id='"+req.body.id+"'",function(err,result) {
        //connection.query("UPDATE accounts SET username='"+req.body.username+",email='"+req.body.email+",password='"+req.body.password+"'WHERE id='"+req.body.id+"'",function(err,result) {
        //connection.query("UPDATE accounts SET username=?,email=?,password=? WHERE id=?",[username,email,password,id],function(err,results){
            if(err) throw err;
            else res.send('Succesfully Updated ID:'+req.body.id);
        });
    })
    return app;
})();