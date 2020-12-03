//This is used to connect to the Profile Table
//get a list of users
//create account 
//delete
//update
const query = require('../db/db-connection');
const { multipleColumnSet } = require('../util/common.utils');
const { setmultipleColumnSet } = require('../util/uncommon.utils');
// const Role = require('../utils/userRoles.utils');
class UserModel {
    tableName = 'profile';

    find = async (params = {}) => {
        let sql = `SELECT * FROM ${this.tableName}`;

        if (!Object.keys(params).length) {
            return await query(sql);
        }

        const { columnSet, values } = multipleColumnSet(params)
        sql += ` WHERE ${columnSet}`;

        return await query(sql, [...values]);
    }

    findOne = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `SELECT * FROM ${this.tableName}
        WHERE ${columnSet}`;

        const result = await query(sql, [...values]);

        // return back the first row (user)
        return result[0];
    }

    

    create = async ({ Profile_id, Name, Team_Id, Description, Department }) => {
        const sql = `INSERT INTO ${this.tableName}
        ( Profile_id, Name, Team_Id, Description, Department) VALUES (?,?,?,?,?)`;

        const result = await query(sql, [ Profile_id, Name, Team_Id, Description, Department]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }
    update = async (params, id) => {
        const { columnSet, values } = setmultipleColumnSet(params)

        console.log(columnSet)
        console.log(values)
        const sql = `UPDATE profile SET ${columnSet} WHERE Profile_id = ?`;

        const result = await query(sql, [...values, id]);

        return result;
    }

    delete = async (id) => {
        const sql = `DELETE FROM ${this.tableName}
        WHERE Profile_id = ?`;
        const result = await query(sql, [id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }
}

module.exports = new UserModel;