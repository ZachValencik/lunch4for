// const asyncHandler = require('express-async-handler')
// let { verifyAdminStatus } = require('../controller/admin_controller')
// let connection = require('../model/connection')
// const bcrypt = require('bcryptjs')
// module.exports = (() => {
//     let auth = function (request, response, next) {
//         let email = request.body.email + '@aurora.edu';
//         let password = request.body.password;
//         if (email && password) {
//             connection.query('SELECT * FROM accounts WHERE email = ?', [email], asyncHandler(async (error, results, fields) => {
//                 if (results.length > 0 &&(await bcrypt.compare(password,results[0].password))) {
//                     // console.log(results[0].admin)
//                     request.session.loggedin = true;
//                     if (results[0].admin === 1) {
//                         console.log("I have been invoked", results[0])
//                         request.session.admin = !(await verifyAdminStatus(results[0]))
//                     }
//                     console.log(request.session.admin)
//                     //this sets up information for the home page
//                     request.session.username = results[0].username;

//                     //this sends a json copy to the selected row aka user
//                     request.session.account = results[0]

//                     return next();
//                 } else {
//                     // response.send('Incorrect Username and/or Password!');
//                     request.session.valid = true
//                     response.redirect("/login")
//                 }
//                 response.end();
//             }))
//         } else {
            
//             response.send('Please enter Username and Password!');
//             return response.sendStatus(401); 
//             response.end();
//         }


//     }
//     return auth;
// })();