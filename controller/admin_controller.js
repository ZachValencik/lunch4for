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
        const is_admin = await AdminModel.findOne({Account_Id : params.id})
        console.log(is_admin)
        if(is_admin){
            return true
        }else{
            return false
        }

    }
    admin_session = async (request, response, next) => {
        if (request.session.loggedin && request.session.admin) {
            return next()
        } else {
            return response.redirect("/restricted")
        }
    }
    createAdmin = async ( u_id) => {
        const acc = await AdminModel.findOne({Account_Id : u_id})
        if (!acc){
            await AdminModel.create({A_Id : u_id, Account_Id : u_id, Role: `Admin` })
            // return true
        }

    }

    updateActivity  = async (id_list = [], activity_list = []) => {
        // console.log(id_list, activity_list)

        // let formated = []
        // let count = 0
        // id_list.forEach((id) => {
        //     formated.push({id : id, active : activity_list[count]})
        //     count++
        // })

        // let count = 0
        // id_list.forEach((id) => {
        //     console.log(activity_list[count])
        //     await AccountModel.update({ active : activity_list[count]}, id)
        //     count ++
        // })
    }


}
module.exports = new AdminController;