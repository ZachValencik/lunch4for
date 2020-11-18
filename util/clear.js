const { request } = require("express");

module.exports = (() => {
    let clear = function clear() {
        if (request.login !== undefined) {
            // request.signup = {}
            request.login = {}
        }
        if (request.signup !== undefined) {
            request.signup = {}
            // request.login = {}
        }
    }
    return clear
})();