module.exports = (() => {
    'use strict';
    let app = require('express').Router();
    let connection = require('../connection')
    app.get('/nitha', function (req, res) {
        res.send('Hello Nitha');
    });
    
    return app;
})();