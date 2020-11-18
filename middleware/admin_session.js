module.exports = (() => {
    let admin_session = function (request, response, next) {
        if (request.session.loggedin && request.session.admin) {
            return next()
        } else {
            return response.redirect("/restricted")
        }
        response.end();
    }
    return admin_session
})();