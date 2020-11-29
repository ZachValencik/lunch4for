//This is used to connect to the Account Table
//get a list of users
//create account 
//delete
//update
const query = require('../db/db-connection');
const { multipleColumnSet } = require('../util/common.utils');
const { setmultipleColumnSet } = require('../util/uncommon.utils');
// const Role = require('../utils/userRoles.utils');
class AdminModel {
    tableName = 'admin';

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

    


    create = async ({ id, password, username }) => {
        const sql = `INSERT INTO ${this.tableName}
        ( A_Id, A_Pass, A_Name) VALUES (?,?,?)`;

        const result = await query(sql, [id, password, username ]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }
    //Jackie can use this
    update = async (params, id) => {
        const { columnSet, values } = setmultipleColumnSet(params)

        const sql = `UPDATE admin SET ${columnSet} WHERE A_Id = ?`;

        const result = await query(sql, [...values, id]);

        return result;
    }

    delete = async (id) => {
        const sql = `DELETE FROM ${this.tableName}
        WHERE A_Id = ?`;
        const result = await query(sql, [id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }
}

module.exports = new AdminModel;