class profileData {
    #name = '';
    #description = '';
    #department = '';

    constructor(name, description, department) {
        this.#name = name;
        this.#description = description;
        this.#department = department;
        this._name = name;
        this._description = description;
        this._department = department;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }

    get department() {
        return this._department;
    }

    set department(value) {
        this._department = value;
    }
}

module.exports = (() => {
    const connection = require('../controller/connection');
    const getData = accountId => new Promise((resolve, reject) => {
        connection.query('SELECT * FROM profile WHERE Profile_id = ?', [accountId], (error, results, fields) => {
            // console.log("data exist called lol")
            // console.log(results.length)

            if (results.length > 0) {
                resolve(new profileData(
                    results[0].Name,
                    results[0].Description,
                    results[0].Department,
                ))
            }
        });
    });

    getData().then(result => {
        //  console.log(result);
        return result

    });

    return getData
})();