const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const { response, request } = require('express');

let app = express();
app.set('view engine', 'pug')
// app.set('views', './views')
app.use(express.static('public'))
//sets up connection to database
//read mysql_notes.txt for instructions on how to set it up
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'Lunch4Four',
    password: 'csc4350',
    database: 'lunch4four'
});


//express sessions: uses cookies to know who is logged in or not
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
//not sure about this part but it works
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function (request, response) {
    if (request.session.loggedin) {
        response.redirect("/home")
    } else {
        response.redirect("/login")
    }

    // response.render('login')
});
//log in page
app.get('/login', function (request, response) {
    response.render('login')
})
//sign up page
//INSERT INTO `accounts` (`id`, `username`, `password`, `email`) VALUES (1, 'test', 'test', 'test@test.com');
app.get('/signup', function (request, response) {
    if (!request.session.loggedin) {
    response.render('signup')}
    else{
        response.redirect("/logout")
    }
});
//connected to the log in page
//verify if user exist
app.post('/auth', function (request, response) {
    let username = request.body.username;
    let password = request.body.password;
    if (username && password) {
        connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function (error, results, fields) {
            if (results.length > 0) {
                request.session.loggedin = true;
                //this sets up information for the home page
                request.session.username = username;

                //this sends a json copy to the selected row aka user
                request.session.account = results[0]

                console.log(results[0])
                // request.session.email = email;
                // console.log(results)
                // console.log(results.RowDataPacket)

                response.redirect('/home');
            } else {
                response.send('Incorrect Username and/or Password!');
            }
            response.end();
        });
    } else {
        response.send('Please enter Username and Password!');
        response.end();
    }
});

//linked to the sign up page
//creates user in the database
app.post('/create', function (request, response) {
    let username = request.body.username;
    let password = request.body.password;
    let email = request.body.email;
    let id = genID(connection);
    if (username && password && email) {
        connection.query('INSERT INTO `accounts` (`id`, `username`, `password`, `email`) VALUES (?, ?, ?, ?)', [id, username, password, email], function (error, results, fields) {
            if (error) throw error;
            console.log(results)
            // request.session.password = password;
            // request.session.username = username;

            //request.session.loggedin = true;
            //request.session.username = this.username;
            //console.log(request.session.password, request.session.username)
            response.redirect(307, '/success');


        })
    }
    //response.end(); this breaks it
});

//this is the home page
app.get('/home', function (request, response) {
    if (request.session.loggedin) {
        let info = request.session
        //console.log(info)
        response.render('home', { info })
    } else {
        response.send('Please login to view this page!');
    }
    response.end();
});

//settings
//bug found ---> profile page then go into settings
app.post("/account", (request, response) => {
    console.log(request.session.loggedin)
    if (request.session.loggedin) {
        response.render("account")
    } else {
        response.redirect("/restricted")
    }
    response.end();
})


//profile
app.get("/users", (request, response) => {
    if (request.session.loggedin) {
        console.log(request.session.username)
        response.redirect(`/users/${request.session.username}`)
    } else {
        //response.redirect("Page Not Found")
        response.redirect("/restricted")
    }
    response.end();
})

app.get("/users/:username", (request, response) => {
    let username = request.params.username;
    console.log(username);
    let prefix = ""
    //your profile
    if (request.session.loggedin && request.session.username === username) {
        prefix = "You are viewing your profile, "
        response.render('profile', { username, prefix })
    }
    //your profile to other people
    else if(request.session.loggedin && request.session.username !== username ) {
        prefix = "You are viewing this person's public page => ";
        response.render('profile', { username, prefix })

    }else{
        response.redirect("/restricted")
    }
    response.end();
})



//this is the log out page /function
app.get('/logout', (request, response) => {
    if (request.session.loggedin) {
        request.session.loggedin = false;
        response.redirect("/login")
    } else {
        response.redirect("/restricted")
    }
    response.end();
})
app.post('/success', (request, response) => {
    response.render("success")
    response.end();
})
//this should be applied to the else statements if the person is not logged in or what not
app.get('/restricted', (request, response) => {
    response.send("Permision denied")
    response.end();
})
//basic 404 page
app.get('*', (request, response) => {
    response.send("Page not found")
    response.end();
})
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


//this function can be outsourced to another file
function genID(dBase) {
    connection.query('SELECT id FROM accounts', function (error, results, fields) {
        if (results == 0) {
            return 1
        } else {

            return Math.max(results) + 1;
        }

    })
}

app.listen(3000);