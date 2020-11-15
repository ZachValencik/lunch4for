module.exports = (() => {
    const asyncHandler = require('express-async-handler')
    // let dataExist = require("./data-exist")
    // let verifyPassword = require("../util/verifyPassword")
    // let connection = require("./connection")
    let verifyAdmin = require('../controller/verify-admin-status')
    // let genID = require('../util/id-generator')
    let adminAuth = asyncHandler(async (result) => {
        let adStatus = await verifyAdmin(result)
    })

    return adminAuth
})();