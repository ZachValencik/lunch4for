module.exports = (() => {

var nodemailer = require('nodemailer');
const dotenv = require('dotenv')
dotenv.config({path:'./.env'});

const connection = require('../controller/connection');

//create a loop that loops the database and emails each thingy 
connection.query('select * from accounts where active =1 and admin=0'),(error,results,fields)=>{
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'lunch4four@gmail.com',
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

})();