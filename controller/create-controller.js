module.exports = (() => {
    const asyncHandler = require('express-async-handler')
    let dataExist = require("./data-exist")
    let verifyPassword = require("../util/verifyPassword")
    let connection = require("./connection")
    let genID = require('../util/id-generator')
    const bcrypt = require('bcryptjs')
    let signupVerify = asyncHandler(async (bodyEm, bodyPw, bodyPw2, request, response, next) => {
        //returns true if something went wrong
        let email = await dataExist(bodyEm + "@aurora.edu")
        let pw = verifyPassword(bodyPw, bodyPw2)
        if (email || pw) {
            // console.log("Create level: ", email, pw)
            // console.log("stage one")
            if (email && pw) {
                // console.log("stage two")
                request.signup.both = true
                response.cookie('signup', { both: true, email: false, password: false }, { signed: true })
                console.log(request.signedCookies.signup)

            } else if (email) {
                // console.log("line 107 email = ", email)
                // request.session.invalid = true;
                request.signup.email = true
                response.cookie('signup', { both: false, email: true, password: false }, { signed: true })
                // response.cookie('signup', {email : true}, { signed: true })
                // console.log("Create controller has been called 2",request.signup.email )
                // return response.redirect('/signup')
            } else if (pw) {
                // request.session.valid = true;
                request.signup.password = true
                response.cookie('signup', { both: false, email: false, password: true }, { signed: true })
                // response.cookie('signup', {password : true}, { signed: true })

                // console.log("Create controller has been called 3",request.signup.password)
                // console.log("else if pw was called")
                // return response.redirect('/signup')
            } else {
                // response.cookie('signup', { both: false, email: false, password: false }, { signed: true })
                console.log("else statement", email, pw)
                return false
            }

            // console.log("create controller lever: ", request.signup)
            return response.redirect('/signup')
            //response.end();
        } else {
            response.cookie('signup', { both: false, email: false, password: false }, { signed: true })
            let tempEmail = (bodyEm + "@aurora.edu")
            response.cookie('profile_email', tempEmail, { signed: true })
            // request.tempProfile.email = bodyEm + "@aurora.edu";
            // console.log(">>",request.tempProfile)
            let userInput = {
                username: bodyEm,
                email: bodyEm + "@aurora.edu",
                password: await bcrypt.hash(bodyPw,10), //hashes the pw when put inside the db
                id: genID(connection)

            }
            // console.log("this is the create controller file")
            return userInput
        }
    })

    return signupVerify
})();