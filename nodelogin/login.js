const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'Lunch4Four',
  password: 'csc4350',
  database: 'nodelogin'
});

let app = express();
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function (request, response) {
  response.sendFile(path.join(__dirname + '/login.html'));
});
//INSERT INTO `accounts` (`id`, `username`, `password`, `email`) VALUES (1, 'test', 'test', 'test@test.com');
app.get('/signup', function (request, response) {
  response.sendFile(path.join(__dirname + '/signup.html'));
});

app.post('/create', function (request, response) {
  let username = request.body.username;
  let password = request.body.password;
  let email = request.body.email;
  let id = 11;
  if (username && password && email) {
    connection.query('INSERT INTO `accounts` (`id`, `username`, `password`, `email`) VALUES (?, ?, ?, ?)', [id, username, password, email], function (error, results, fields) {
      if(error) throw error;
      console.log(results)
        request.session.password = password;
        request.session.username = username;

        console.log(request.session.password, request.session.username)
        response.redirect('/authNew');
        
      
    })
  }

});

app.post('/auth', function (request, response) {
  let username = request.body.username;
  let password = request.body.password;
  if (username && password) {
    connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function (error, results, fields) {
      if (results.length > 0) {
        request.session.loggedin = true;
        request.session.username = username;
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

app.get('/authNew', function (request, response) {
  let username = request.session.password;
  let password = request.session.username;
  if (username && password) {
    connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function (error, results, fields) {
      if (results.length > 0) {
        request.session.loggedin = true;
        request.session.username = username;
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


app.get('/home', function (request, response) {
  if (request.session.loggedin) {
    response.send('Welcome back, ' + request.session.username + '!');
  } else {
    response.send('Please login to view this page!');
  }
  response.end();
});

app.listen(3300);