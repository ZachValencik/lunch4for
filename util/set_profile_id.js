module.exports = (() => {
    const connection = require('../controller/connection');
    const set_id = userInput => new Promise((resolve, reject) => {
        connection.query('SELECT * FROM accounts WHERE email = ?', [userInput], (error, results, fields) => {
            // console.log("data exist called lol")
            // console.log(results.length)\
            if (results.length > 0) {
                resolve(results[0].id);

            }
        });
    });

    set_id().then(result => {
        //  console.log(result);
        return result

    });

    return set_id
})();