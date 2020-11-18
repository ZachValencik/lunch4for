//sets up connection to database
//read mysql_notes.txt for instructions on how to set it up
module.exports = (() => {
    const mysql = require('mysql');
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'Lunch4Four',
        password: 'csc4350',
        database: 'lunch4fourdemo'
    });
    return connection
})();