module.exports = (() => {

    let connection = require('../model/connection')
    //creates a random 5 digit int based on the time
    let genId = () => {
        let id = ((Date.now() / 1000000 % 1).toFixed(5) * 100000)
        connection.query('SELECT id FROM accounts', function (error, results, fields) {

            if (results[0].id !== id){
                return id
            }else{
                genId()
            }

               

        })
    }
    return genId


})();