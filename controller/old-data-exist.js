// module.exports = (() => {
//     const connection = require('../model/connection');
//     const userExists = userInput => new Promise((resolve, reject) => {
//         connection.query('SELECT * FROM accounts WHERE email = ?', [ userInput], (error, results, fields) => {
//             // console.log("data exist called lol")
//             // console.log(results.length)
//             resolve(results.length > 0);
//         });
//      });
     
//      userExists(1).then(result => {
//         //  console.log(result);
//          return Boolean(result)

//      });

//     return userExists
// })();