// module.exports = (() => { //foound in login
//     const connection = require('../model/connection');
//     const userExists = userInput => new Promise((resolve, reject) => {
//         connection.query('SELECT * FROM admin WHERE A_Name = ? AND A_Pass = ?', [ userInput.username, userInput.password ], (error, results, fields) => {
//             // console.log("data exist called lol")
//             // console.log(results.length)
//             // console.log(userInput.username)
//             resolve(results.length > 0);
//         });
//      });
     
//      userExists(1).then(result => {
//         //  console.log(result);
//          return Boolean(result)

//      });

//     return userExists
// })();