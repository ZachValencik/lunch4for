module.exports = (() => {
    const asyncHandler = require('express-async-handler')
    let dataExist = require("./data-exist")
    let verifyPassword = require("../util/verifyPassword")
    let connection = require("./connection")
    let genID = require('../util/id-generator')
    let signupVerify = asyncHandler(async (bodyEm, bodyPw, bodyPw2, request, response) => {
        let email = await dataExist(bodyEm + "@aurora.edu")
        let pw = verifyPassword(bodyPw, bodyPw2)
        if (email || pw) {
            // console.log("Create level: ", email, pw)
            // console.log("stage one")
            if (email && pw) {
                // console.log("stage two")
                request.session.invalid = true;
                request.session.valid = true;
                return response.redirect('/signup')

            } else if (email) {
                // console.log("line 107 email = ", email)
                request.session.invalid = true;
                return response.redirect('/signup')
            } else if (pw) {
                request.session.valid = true;
                // console.log("else if pw was called")
                return response.redirect('/signup')
            } else {
                console.log("else statement", email, pw)
                return false
            }
            //response.end();
        } else {

            let userInput = {
                username: bodyEm,
                email: bodyEm + "@aurora.edu",
                password: bodyPw,
                id: genID(connection)

            }
            // console.log("this is the create controller file")
            return userInput
        }
    })

    return signupVerify
})();