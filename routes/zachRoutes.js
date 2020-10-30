module.exports = (() => {
    'use strict';
    let app = require('express').Router();
    let connection = require('../connection')
    app.get('/zach', function (req, res) {
        res.send('Hello Zach');
    });
    
    return app;
})();