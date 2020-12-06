module.exports = (() => {
    const account_session = function (request, response, next) {
        console.log("This is account befor if statement",request.accounts);

        if (request.accounts === undefined) {
            request.accounts = {}
            //console.log("This is account after",request.accounts);

        }
        if (request.accounts === undefined) {
            request.accounts.info= {}
            //console.log("This is account.info",request.accounts);

        }
        next();
     }
    return account_session
})();