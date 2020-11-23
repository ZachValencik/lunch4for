//this module should be used to create a user

//const { userInfo } = require('os');

//it should verify that the given user information like username or password are not present in the database
module.exports = (() => {
    let connection = require('../controller/connection')
    //let genID = require('../util/id-generator')
    
    let createUser = (userinput) =>  connection.query('INSERT INTO `accounts` (`id`, `username`, `password`, `email`) VALUES (?, ?, ?, ?)', [userinput.id, userinput.username, userinput.password, userinput.email], function (error, results, fields) {
        if (error) throw error;
       // console.log(results)
    

    })
    return createUser
    

    

})();