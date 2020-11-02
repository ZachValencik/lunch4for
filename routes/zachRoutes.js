module.exports = (() => {
    'use strict';
    let app = require('express').Router();
    let connection = require('../controller/connection')
    app.get('/zach', function (req, res) {
        res.send('Hello Zach');
    });
    
    return app;
})();