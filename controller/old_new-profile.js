// //this is used to add data into the profile table
// //all data is originally collected fromt the /create page since it loads a form 
// //the id is the same are the primary key of the account
// module.exports = (() => {
//     let connection = require('../model/connection')
    
//     let createUser = (profile_package) =>  connection.query('INSERT INTO `profile` (`Profile_id`, `Name`, `Team_Id`, `Description`, `Department`) VALUES (?, ?, ?, ?,?)', [
//         profile_package.Profile_id,
//         profile_package.Name,
//         profile_package.Team_Id,
//         profile_package.Description,
//         profile_package.Department
//     ], function (error, results, fields) {
//     // let createUser = (profile_package) =>  connection.query('INSERT INTO profile VALUES( ? )', [profile_package], function (error, results, fields) {
//         if (error) throw error;
//         console.log('data inserted');

//     })
//     return createUser

// })();