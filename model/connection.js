//sets up connection to database
//read mysql_notes.txt for instructions on how to set it up
const dotenv = require('dotenv')
dotenv.config({path:'./.env'});

module.exports = (() => {
    const mysql = require('mysql');
    const connection = mysql.createConnection({
        host: process.env.database_host,
        user: process.env.database_user,
        password: process.env.database_password,
        database: process.env.database
    });
    return connection
})();