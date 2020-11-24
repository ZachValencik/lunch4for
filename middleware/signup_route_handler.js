module.exports = (() => {
    let signup_handler = function (request, response, next) {
        // console.log(request.session.invalid, request.session.valid)
        //invalid == email (true)
        //valid == password
        // request.signup.password 
        // request.signup.email
        // request.signup.both
        //

        // response.cookie('signup', { both: false, email: false, password: false }, { signed: true })
        if (request.signedCookies.signup) {


            if (request.signedCookies.signup.email || request.signedCookies.signup.password || request.signedCookies.signup.both) {
                if (request.signedCookies.signup.both) {
                    console.log(">>>both")
                    // console.log(">>>>both (signput-route-handlr) has been invoked", request.signup.both,request.signup.email,request.signup.password )
                    request.signup.both = false
                    request.signup.invalid.invalidEmail = true
                    request.signup.invalid.invalidPassword = true
                    // console.log("both inputs are wrong")
                    // return next()
                } else if (request.signedCookies.signup.email) {
                    console.log(">>>email")

                    // console.log(">>>>Email has been invoked")
                    request.signup.email = false;
                    request.signup.invalid.invalidEmail = true
                    // return next()
                    // console.log("email exist")
                    // response.render('signup', {
                    //     invalidEmail: true
                    // })
                } else if (request.signedCookies.signup.password) {
                    console.log(">>>password")

                    // console.log(">>>>Password has been invoked")
                    request.signup.password = false;
                    request.signup.invalid.invalidPassword = true
                    // return next()
                    // console.log("password do not match")
                    // response.render('signup', {
                    //     invalidPassword: true
                    // })
                } else {
                    response.cookie('signup', { both: false, email: false, password: false }, { signed: true })
                    request.signup.invalid.invalidPassword = false
                    request.signup.invalid.invalidEmail = false
                }
            }
        }else{
            response.cookie('signup', { both: false, email: false, password: false }, { signed: true }) }
        // console.log("Signup_handler has been called and moving on", request.signup)
        return next()
    }


    return signup_handler;
})();