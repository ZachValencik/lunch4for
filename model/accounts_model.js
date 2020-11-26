//This is used to connect to the Account Table
//get a list of users
//create account 
//delete
//update
const asyncHandler = require('express-async-handler')
const query = require('../db/db-connection');
const { multipleColumnSet } = require('../util/common.utils');
// const Role = require('../utils/userRoles.utils');
class UserModel {
    tableName = 'accounts';

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

    


    create = async ({ username, password, email }) => {
        const sql = `INSERT INTO ${this.tableName}
        ( username, password, email) VALUES (?,?,?)`;

        const result = await query(sql, [username, password, email]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }
    //Jackie can use this
    update = async (params, id) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `UPDATE user SET ${columnSet} WHERE id = ?`;

        const result = await query(sql, [...values, id]);

        return result;
    }

    delete = async (id) => {
        const sql = `DELETE FROM ${this.tableName}
        WHERE id = ?`;
        const result = await query(sql, [id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }
}

module.exports = new UserModel;