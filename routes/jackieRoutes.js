module.exports = (() => {
    'use strict';
    let app = require('express').Router();
    let connection = require('../controller/connection')
    app.get('/jackie', function (req, res) {
        res.send('Hello Jackie');
    });
    
    return app;
})();