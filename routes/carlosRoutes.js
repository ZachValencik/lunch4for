module.exports = (() => {
    'use strict';
    let app = require('express').Router();
    let connection = require('../connection')
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
            response.render('signup')
        }
        else {
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
    app.get("/account", (request, response) => {
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
        else if (request.session.loggedin && request.session.username !== username) {
            prefix = "You are viewing this person's public page => ";
            response.render('profile', { username, prefix })

        } else {
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


    function genID(dBase) {
        connection.query('SELECT id FROM accounts', function (error, results, fields) {
            if (results == 0) {
                return 1
            } else {

                return Math.max(results) + 1;
            }

        })
    }

    return app;
})();