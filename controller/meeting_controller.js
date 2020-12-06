const AccountModel = require("../model/accounts_model")
const MeetingModel = require('../model/meeting_model')
const meetingData = require('../util/meeting_data')
const AccountController = require('./account_controller')

class MeetingController {

    //Get use profile_id to find team ID from profile table
    getMeetingID = async(userId) => {
        const team_id = await MeetingModel.findTeamID({Profile_id: userId})
        return team_id[0];
    }

    //gets the data from the profile table and formats it so that it shows up on the pug file
    getMeetingData = async (teamId) => {
        const t_data = await MeetingModel.findGroup({ Team_Id: teamId })
        console.log("In getMeetingData, t_data: ", t_data);
        let r = [];
        if (t_data) {
            for (let i = 0; i < t_data.length; i++) {
                r[i] = new meetingData(
                    t_data[i].Name,
                    t_data[i].Department,
                    t_data[i].Leader
                )
              }
            return r
        }

    }

}

module.exports = new MeetingController;