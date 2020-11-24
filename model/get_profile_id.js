module.exports = (() => {
    const connection = require('../controller/connection');
    const getProfileID = username => new Promise((resolve, reject) => {
        connection.query('SELECT * FROM accounts WHERE username = ?', [username], (error, results, fields) => {
            // console.log("data exist called lol")
            // console.log(results.length)
            if (results.length > 0) {

                resolve(results[0].id);
            }
        });
    });

    getProfileID().then(result => {
        //  console.log(result);
        return result

    });

    return getProfileID
})();