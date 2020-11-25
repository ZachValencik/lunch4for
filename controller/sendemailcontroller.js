module.exports = (() => {
const mysql = require('mysql')
var nodemailer = require('nodemailer');

//const dotenv = require('dotenv')
//dotenv.config({path:'./.env'});
//const connection = require('../controller/connection');
const connection = mysql.createConnection({ //seems the only way below code works if this is here the above code gives errors
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'lunch4four'
});

connection.connect(function(err) {
  if (err) throw err;
  connection.query("SELECT username, email FROM accounts where active =1 and admin =0", function (err, result, fields) {
    if (err) throw err;
    
    //for loop that loops thru all the emails and sends out the
    for(let i=0;i<result.length;i++){
    console.log(result[i].email);
    

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'lunch4four@gmail.com',// account i made just to send email for project lol, had to go into email to allow apps to use email for login, tried .env file but wont work for some reason
        pass: 'lunch4four123'
      }
    }); 
    
    var mailOptions = {
      from: 'lunch4four@gmail.com',  //maybe this also?
      to: result[i].email, //this gets the email from the loop
      subject: 'For Active users only', //admin can change the subject also.
      text: 'This is your monthly message '+ result[0].username+ ' from lunch4four blah blah blah..' // hopefully the admin can change this message and send it out to all activate 
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log('email must not exist?');
      } else {
        console.log('Email sent: ' + info.response);
      }
      
      
    });


    
  }




























  });
});

/*
//create a loop that loops the database and emails each thingy 
connection.query('select email from accounts where active =1 and admin=0'),async(error,results)=>{

console.log("hello")
  
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'lunch4four@gmail.com',// account i made just to send email for project lol, had to go into email to allow apps to use email for login, tried .env file but wont work for some reason
    pass: 'lunch4four123'
  }
}); 

var mailOptions = {
  from: 'lunch4four@gmail.com', 
  to: results.body.email,
  subject: 'FOr Active users only',
  text: 'This is your monthly message blah blah' // hopefully the admin can change this message and send it out to all activate 
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log('email must not exist?');
  } else {
    console.log('Email sent: ' + info.response);
  }
});

}
*/
})();