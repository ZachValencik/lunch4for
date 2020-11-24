//this is used to check if a username exist by sending true or false
//We need to create a new one that takes both input and query to reduce any duplicates
//this is too similar to data_exist.js 
module.exports = (() => {
    const connection = require('../controller/connection');
    const userExists = userInput => new Promise((resolve, reject) => {
        connection.query('SELECT * FROM accounts WHERE username = ?', [ userInput], (error, results, fields) => {
            // console.log("data exist called lol")
            // console.log(results.length)
            resolve(results.length > 0);
        });
     });
     
     userExists(1).then(result => {
        //  console.log(result);
         return Boolean(result)

     });

    return userExists
})();