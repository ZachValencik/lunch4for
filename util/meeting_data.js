class meetingData {
    #name = '';
    #department = '';
    #leader = '';

    constructor(name, department, leader) {
        this.#name = name;
        this.#department = department;
        this.#leader = leader;
        this._name = name;
        this._department = department;
        this._leader = leader;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get leader() {
        return this._leader;
    }

    set leader(value) {
        this._leader = value;
    }

    get department() {
        return this._department;
    }

    set department(value) {
        this._department = value;
    }
}

module.exports = meetingData
