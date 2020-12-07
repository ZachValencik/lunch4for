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

    findMeeting = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `SELECT Team_Id, Leader, Meet_Location,
         DATE_FORMAT(Meet_Date, '%m/%d/%Y') AS "Meet_Date",
         DATE_FORMAT(Meet_Time, '%h:%i %p') AS "Meet_Time"
         FROM team WHERE ${columnSet}`;

        const result = await query(sql, [...values]);
        return result;
    }

    find = async (params = {}) => {
        let sql = `SELECT * FROM team`;

        if (!Object.keys(params).length) {
            return await query(sql);
        }

        const { columnSet, values } = multipleColumnSet(params)
        sql += ` WHERE ${columnSet}`;

        return await query(sql, [...values]);
    }

    //uses profile id to find the team_id using the profile table
    //returns a team_id
    findTeamID = async (params) => {
        const { columnSet, values } = multipleColumnSet(params);
        //columnSet = "Profile_id = ?"
        //values = array of values like team_id;

        const sql = `SELECT * FROM ${this.profileTable} WHERE ${columnSet}`;

        const result = await query(sql, [...values]);
        //console.log('In findTeamID function, result: ' , result);
        return result;
    }

    //method is sent team id
    //finds every row in profile table where team_id column matches the team_id given
    findGroup = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `SELECT * FROM ${this.profileTable} WHERE ${columnSet}`;

        const result = await query(sql, [...values]);
        return result;
    }

    //updates team table with meeting info
    update = async (params, id) => {
        const { columnSet, values } = setmultipleColumnSet(params)

        //console.log('Columnset Values for update: ', columnSet)
        //console.log('Values from update: ', values)
        const sql = `UPDATE team SET ${columnSet} WHERE Team_Id = ?`;

        const result = await query(sql, [...values, id]);

        return result;
    }

    getSummary = async() =>{
        const sql = `SELECT * FROM meeting_summary`;
        const result = await query(sql);

        return result;
    }
}

module.exports = new MeetingModel;