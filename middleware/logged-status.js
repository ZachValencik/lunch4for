module.exports = (() => {
    let user_session = function (request, response, next) {
        if (request.session.loggedin) {
            return next()
        } else {
            return response.sendStatus(400)
        }
        response.end();
    }
    return user_session
})();