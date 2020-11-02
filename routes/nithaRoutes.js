module.exports = (() => {
    'use strict';
    let app = require('express').Router();
    let connection = require('../controller/connection')
    app.get('/nitha', function (req, res) {
        res.send('Hello Nitha');
    });
    
    return app;
})();