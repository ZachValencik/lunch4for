module.exports = (() => {
let banner_alerts = function (request, response, next) {

    if (request.login === undefined) {
        request.login = {}

    }
    if (request.signup === undefined) {
        request.signup = {}

    }
    // request.signup = {}
    // console.log("setting up variables",request.signup)
    if (request.login.error === undefined) {
        request.login.error = false
        // console.log("setting up variables",request.login.mismatch)
    }

    if (request.signup.password === undefined) {
        request.signup.password = false
    }

    if (request.signup.email === undefined) {
        request.signup.email = false
    }

    if (request.signup.both === undefined) {
        request.signup.both = false
    }
    if (request.signup.invalid === undefined) {
        request.signup.invalid = {
            invalidEmail: false,
            invalidPassword: false
        }
    }
    next()

}
return banner_alerts

})();