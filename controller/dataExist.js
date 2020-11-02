module.exports = (() => {
    let connection = require('../controller/connection');

let  dataExist = (userInput) => {
    //  var exist = true
        connection.query('SELECT * FROM accounts WHERE email = ?', [ userInput], function (error, results, fields) {
            console.log("data exist called lol")
            console.log(results.length)
            if (results.length > 0) {
                //the info exist
                console.log("account exist")
                // exist = true
                return true
            }else if (results.length === 0) {
                // exist = false
                // console.log("account does not exist", exist)
                return false
            }

        })
        // console.log("the exist value is ", exist)
        //return exist
    }


    return dataExist


})();