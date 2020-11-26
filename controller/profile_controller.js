const AccountModel = require("../model/accounts_model")
const ProfileModel = require('../model/profile_model')
const profileData = require('../util/profile_data')
class ProfileController {

    getProfileData = async (accountId) => {

        const p_data = await ProfileModel.findOne({Profile_id : accountId})
        if(p_data){
            let r = new profileData(
                p_data.Name,
                p_data.Description,
                p_data.Department,
            )
            return r
        }

    }

    getProfileId = async (un) => {
        const exist = await AccountModel.findOne({username : un})
        return exist.id

    }

    
   


}

module.exports = new ProfileController;