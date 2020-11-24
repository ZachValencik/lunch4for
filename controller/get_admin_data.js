//return if the number of active or inactive users
module.exports = (() => {
    const connection = require('../controller/connection');
    const userExists = userInput => new Promise((resolve, reject) => {
        connection.query('SELECT * FROM accounts WHERE active = ? AND admin = 0', [ userInput], (error, results, fields) => {
            // console.log("data exist called lol")
            // console.log(results.length)
            resolve(results.length);
        });
     });
     
     userExists().then(result => {
        //  console.log(result);
         return result

     });

    return userExists
})();