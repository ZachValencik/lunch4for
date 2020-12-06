const AccountModel = require("../model/accounts_model")
const MeetingModel = require('../model/meeting_model')
const groupData = require('../util/meeting_data')
const AccountController = require('./account_controller')

class MeetingController {

    getMeetingData = async(teamId) => {
        const m_data = await MeetingModel.findMeeting({ Team_Id: teamId })
        if(m_data){
            return m_data[0];
        }
    }

    //Use profile_id to find team ID from profile table
    getUserInfo = async(proId) => {
        const profile_data = await MeetingModel.findTeamID({Profile_id: proId})
        if(profile_data){
            return profile_data[0];
        }
    }

    //gets the data from the profile table and formats it so that it shows up on the pug file
    getGroupData = async (teamId) => {
        const g_data = await MeetingModel.findGroup({ Team_Id: teamId })
        //console.log("In getGroupData, g_data: ", g_data);
        let r = [];
        if (g_data) {
            for (let i = 0; i < g_data.length; i++) {
                //populates r list with meetingData objects defined in ('..util/meeting_data.js')
                r[i] = new groupData(
                    g_data[i].Name,
                    g_data[i].Department,
                    g_data[i].Leader
                )
              }
            return r
        }

    }

    //for admin users, get meeting data for every user

}

module.exports = new MeetingController;