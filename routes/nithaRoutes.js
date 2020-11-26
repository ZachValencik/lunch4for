module.exports = (() => {
    'use strict';
    let app = require('express').Router();
    let connection = require('../model/connection')
    app.get('/nitha', function (req, res) {
        res.send('Hello Nitha');
    });
    
    app.get('/homeNitha', function (request, response) {
        if (request.session.loggedin) {
            let info = request.session
            response.render('homeNitha', { info })
        } else {
            response.send('Please login to view this page!');
        }
        response.end();
    });

    return app;
})();