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

module.exports = profileData
