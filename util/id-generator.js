module.exports = (() => {

    let connection = require('../controller/connection')

    let genId = () => {
        connection.query('SELECT id FROM accounts', function (error, results, fields) {
            if (results == 0) {
                return 1
            } else {

                return Math.max(results) + 1;
            }

        })
    }
    return genId


})();