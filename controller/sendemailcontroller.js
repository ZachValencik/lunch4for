var nodemailer = require('nodemailer');
const dotenv = require('dotenv')
dotenv.config({path:'./.env'});

const connection = require('../controller/connection');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'lunch4four@gmail.com',
    pass: 'lunch4four123'
  }
}); 
//create a loop that loops the database and emails each thingy 
var mailOptions = {
  from: 'lunch4four@gmail.com',
  to: 'zvalencik01@aurora.edu',
  subject: 'Activate your account',
  text: 'Activate your account! Click this link ->!!!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});