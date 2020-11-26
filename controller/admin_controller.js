const AccountModel = require("../model/accounts_model")
const AdminModel = require("../model/admin_model")
class AdminController {

    //this is used to return a number active and inactive users
    
    getActiveUsers = async () => {

        const is = await AccountModel.find({ active: 1, admin: 0 });
        const not = await AccountModel.find({ active: 0, admin: 0 })
        return {
            active: is.length,
            inactive: not.length
        }
    }

    verifyAdminStatus = async (params) => {
        const is_admin = await AdminModel.findOne({A_Name : params.username, A_Pass : params.password})
        console.log(is_admin)
        if(is_admin){
            return true
        }else{
            return false
        }

    }


}

module.exports = new AdminController;