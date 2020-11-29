module.exports = (() => {

    class opt {
        #dept = "";
        #value = "";
    
        constructor(dept, value) {
            this.#dept = dept;
            this.#value = value;
            this._dept = dept;
            this._value = value;
        }
    
        get dept() {
            return this._dept;
        }
    
        set dept(value) {
            this._dept = value;
        }
    
        get value() {
            return this._value;
        }
    
        set value(value) {
            this._value = value;
        }
    }
    let department_options = {

        selectOption : [
            new opt('ABA (Applied Behavior Analysis)', 'ABA'),
            new opt('ACC (Accounting)', 'ACC'),
            new opt('ART (Art)', 'ART'),
            new opt('ATR (Athletic Training)', 'ATR'),
            new opt('BIO (Biology)', 'BIO'),
            new opt('BST (Black Studies)', 'BST'),
            new opt('BUS (Business)', 'BUS'),
            new opt('CHM (Chemistry)', 'CHM'),
            new opt('COM (Communication)', 'COM'),
            new opt('CRJ (Criminal Justice)', 'CRJ'),
            new opt('CSC (Computer Science)', 'CSC'),
            new opt('CSD (Communications Sciences & Disorders)', 'CSC'),
            // new opt('Cybersecurity', 'CYB'),
            new opt('ECN (Economics)', 'ECN'),
            new opt('ECS (Early Childhood Special Education with ESL/Bilingual)', 'ECS'),
            new opt('EDU (Education)', 'EDU'),
            new opt('EGR (Engineering)', 'EGR'),
            new opt('ENG (English)', 'ENG'),
            new opt('ENV (Environmental Studies)', 'ENV'),
            new opt('FIN (Finance)', 'FIN'),
            new opt('FRN (French)', 'FRN'),
            new opt('HAS (Human Animal Studies)', 'HAS'),
            new opt('HED (Health Education)', 'HED'),
            new opt('HIS (History)', 'HIS'),
            new opt('IDS (Interdisciplinary Studies)', 'IDS'),
            new opt('LED (Leadership Studies)', 'LED'),
            new opt('LTS (Latin American Studies)', 'LTS'),
            new opt('MBA (Master of Business Administration)', 'MBA'),
            new opt('MKT (Marketing)', 'MKT'),
            new opt('MPA (Master of Public Administration)', 'MPA'),
            new opt('MST (Museum Studies)', 'MST'),
            new opt('MTH (Mathematics)', 'MTH'),
            new opt('MUS (Music)', 'MUS'),
            new opt('NSM (Natural Science)', 'NSM'),
            new opt('NUR (Nursing)', 'NUR'),
            new opt('PED (Physical Education)', 'PED'),
            new opt('PHL (Philosophy)', 'PHL'),
            new opt('PHY (Physics)', 'PHY'),
            new opt('PSC (Political Science)', 'PSC'),
            new opt('PSY (Psychology)', 'PSY'),
            new opt('REC (Recreation)', 'REC'),
            new opt('REL (Religion)', 'REL'),
            new opt('SBS (Social and Behavioral Science)', 'SBS'),
            new opt('SOC (Sociology)', 'SOC'),
            new opt('SPED (Special Education)', 'SPED'),
            new opt('SPN (Spanish)', 'SPN'),
            new opt('SUS (Sustainability)', 'SUS'),
            new opt('SWK (Social Work)', 'SWK'),
            new opt("THE (Theatre)", "THE"),
        ]

    }
    return department_options


})();