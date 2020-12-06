//This is used to connect to the Team Table
//get a list of teams
//create account 
//delete
//update
const query = require('../db/db-connection');
const { multipleColumnSet } = require('../util/common.utils');
const { setmultipleColumnSet } = require('../util/uncommon.utils');

class MeetingModel {
    profileTable = 'profile';
    teamID = 'Team_Id';

    findTeamID = async (id) => {
        //console.log("In findTeamID function, id: ", id.Profile_id);
        let uId = id.Profile_id;
        const sql = `SELECT Team_Id FROM ${this.profileTable} WHERE Profile_id = ?`;
        const result = await query(sql, uId);
        console.log('In findTeamID function, result: ' , result);
        return result;
    }

    /*
    findGroup = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `SELECT * FROM ${this.profileTable} WHERE ${teamID} = ?`;

        const result = await query(sql, [...values]);
        
        // return back the first row (user)
        console.log(result);
        return result;
    }*/
}

module.exports = new MeetingModel;