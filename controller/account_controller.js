const AccountModel = require("../model/accounts_model")
class AccountController {
    
    getID = async (email) => {

        const data = await AccountModel.findOne({email : email})

        if(data){
            return data.id
        }
       
    }
    getID_UN = async (username) => {

        const data = await AccountModel.findOne({username : username})

        if(data){
            return data.id
        }
       
    }

}

module.exports = new AccountController;