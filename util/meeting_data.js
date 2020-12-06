class meetingData {
    #name = '';
    #teamId = '';
    #department = '';

    constructor(name, teamId, department) {
        this.#name = name;
        this.#teamId = teamId;
        this.#department = department;
        this._name = name;
        this._teamId = teamId;
        this._department = department;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get teamId() {
        return this._teamId;
    }

    set teamId(value) {
        this._teamId = value;
    }

    get department() {
        return this._department;
    }

    set department(value) {
        this._department = value;
    }
}

module.exports = meetingData
