module.exports = (() => {

    function nomatch (pw,pw2)  {
        if( pw === pw2){
            return false
        }else{
            return true
        }

    }

    return nomatch
})();