module.exports = (() => {
    let signup_handler = function (request, response, next) {
        // console.log(request.session.invalid, request.session.valid)
        //invalid == email (true)
        //valid == password
        // request.signup.password 
        // request.signup.email
        // request.signup.both

        if (request.signup.email || request.signup.password || request.signup.both) {
            if (request.signup.both) {
                // console.log(">>>>both (signput-route-handlr) has been invoked", request.signup.both,request.signup.email,request.signup.password )
                request.signup.both = false
                request.signup.invalid.invalidEmail = true
                request.signup.invalid.invalidPassword = true
                // console.log("both inputs are wrong")
                // return next()
            } else if (request.signup.email) {
                // console.log(">>>>Email has been invoked")
                request.signup.email = false;
                request.signup.invalid.invalidEmail = true
                // return next()
                // console.log("email exist")
                // response.render('signup', {
                //     invalidEmail: true
                // })
            } else if (request.signup.password) {
                // console.log(">>>>Password has been invoked")
                request.signup.password = false;
                request.signup.invalid.invalidPassword = true
                // return next()
                // console.log("password do not match")
                // response.render('signup', {
                //     invalidPassword: true
                // })
            } else{
                request.signup.invalid.invalidPassword = false
                request.signup.invalid.invalidEmail = false
            }
        }
        // console.log("Signup_handler has been called and moving on", request.signup)
            return next()
    }

    return signup_handler;
})();