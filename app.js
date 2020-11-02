//all the required Modules
// const debug = require('debug')('app')
const asyncHandler = require('express-async-handler')
const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const { response, request } = require('express');
//this connects to your own file where all your routes are created
let carlosRoutes = require('./routes/carlosRoutes');
let jackieRoutes = require('./routes/jackieRoutes');
let nithaRoutes = require('./routes/nithaRoutes');
let zachRoutes = require('./routes/zachRoutes');

let app = express();
app.set('view engine', 'pug')
app.use(express.static('public'))

//express sessions: uses cookies to know who is logged in or not
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
//not sure about this part but it works
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', carlosRoutes, jackieRoutes, nithaRoutes, zachRoutes);

//basic 404 page
app.get('*', (request, response) => {
    response.send("Page not found")
    response.end();
})

app.listen(3000, function () {
    console.log('The page is live on http://localhost:3000/');
});

//TO DO 
//to do public page
//a profile for users
//create a new schema that is tailored to this instance

//the sign up page should veryfy that the account information isnt present in the database
//then redirect to a secondary page where they must fill out information for their profile and meeting times
//which is then saved into a separate table
//we need a dedicated files for routes that can be exported and imported to this file
//the database is set up, be need a js program to generate the teams and stores it in its own table
// month = "october" member 1 = [user id],member 2 ..... team leader = [user id] 
//the webpage should access that table and find its user id and style it to show the user
//replace any response.send with its own dedicated pug file 
// reorganize and standardize the pug files
//create a template and a function to generate a styles pages 
//create admins role and figure out how to translate to the db ( either a boolean in the main accounts table or new table that list all the admins)

//get ---> get
//post ---307--> post
// get xxxxx post
//post -----> get