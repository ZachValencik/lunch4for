const AccountModel = require("../model/accounts_model")
const ProfileModel = require('../model/profile_model')
const profileData = require('../util/profile_data')
const AccountController = require('./account_controller')
class ProfileController {
    //gets the data from the profile table and formats it so that it shows up on the pug file
    getProfileData = async (accountId) => {
        const p_data = await ProfileModel.findOne({ Profile_id: accountId })
        if (p_data) {
            let r = new profileData(
                p_data.Name,
                p_data.Description,
                p_data.Department,
            )
            return r
        }

    }
    //get profile id via username
    getProfileId = async (un) => {
        const exist = await AccountModel.findOne({ username: un })
        if (exist) {
            return exist.id

        }

    }
    
    //this is used create a default profile for those who dont have one
    createDefault = async (id) => {
        console.log(id)
        // console.log(userId)
        let defaultProfile = {
            Profile_id: id,
            Name: "TBA",
            Team_Id: 1000,
            Description: "TBA",
            Department: "TBA"
        }
        // console.log(defaultProfile)
        await ProfileModel.create(defaultProfile)

    }

    //checks if profile exist by using the username in the url, 
    //if the user exist but their profile is empty, it creates one for them
    profileExist = async (request, response, next) => {
        const username = request.params.username;
        let ID = await AccountController.getID_UN(username)
        let tempPro = await this.getProfileData(ID)
        if (!tempPro) {
            await ProfileController.createDefault(ID)
        }
        console.log('temp:', tempPro)

        // response.send('hey')
        return next()

    }

    profileOwnership = async (request, response, next) => {
        const username = request.params.username;

        const uname =  await AccountController.getUsernameById(request.session.user_id)
        let ID = request.session.user_id
        let profileData = await this.getProfileData(ID)
        console.log('rpf', profileData)
        if (request.session.loggedin && uname === username) {
            response.render('profile', { profileData, owner: true })
        }
        //your profile to other people
        else if (request.session.loggedin && uname !== username) {
            response.render('profile', { profileData, owner: false })

        } else {
            response.redirect("/restricted")
        }


    }


}

module.exports = new ProfileController;