"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewEntry = exports.toNewPatientEntry = exports.parseArray = exports.parseNumber = exports.parseString = exports.parseDate = void 0;
const types_1 = require("./types");
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const isNumber = (number) => {
    return typeof number === 'number';
};
const isArray = (array) => {
    return (Array.isArray(array) &&
        array.every((element) => typeof element === 'string'));
};
const parseDate = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};
exports.parseDate = parseDate;
const parseString = (string) => {
    if (!string || !isString(string)) {
        throw new Error('Incorrect or missing string');
    }
    return string;
};
exports.parseString = parseString;
const parseNumber = (number) => {
    if ((!number && number !== 0) || !isNumber(number)) {
        throw new Error('Incorrect or missing number');
    }
    return number;
};
exports.parseNumber = parseNumber;
const parseArray = (array) => {
    if (!array || !isArray(array)) {
        throw new Error('Incorrect or missing array');
    }
    return array;
};
exports.parseArray = parseArray;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(types_1.Gender).includes(param);
};
const parseGender = (gender) => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};
const toNewPatientEntry = ({ name, dateOfBirth, gender, ssn, occupation, }) => {
    const newEntry = {
        name: (0, exports.parseString)(name),
        dateOfBirth: (0, exports.parseDate)(dateOfBirth),
        gender: parseGender(gender),
        ssn: (0, exports.parseString)(ssn),
        occupation: (0, exports.parseString)(occupation),
        entries: [],
    };
    return newEntry;
};
exports.toNewPatientEntry = toNewPatientEntry;
const toNewEntry = (entry) => {
    switch (entry.type) {
        case 'Hospital':
            const newHospitalEntry = {
                type: entry.type,
                description: (0, exports.parseString)(entry.description),
                date: (0, exports.parseDate)(entry.date),
                specialist: (0, exports.parseString)(entry.specialist),
                discharge: {
                    date: (0, exports.parseDate)(entry.discharge.date),
                    criteria: (0, exports.parseString)(entry.discharge.criteria),
                },
            };
            if (entry.diagnosisCodes) {
                newHospitalEntry.diagnosisCodes = entry.diagnosisCodes;
            }
            return newHospitalEntry;
        case 'HealthCheck':
            const newHealthCheckEntry = {
                type: entry.type,
                description: (0, exports.parseString)(entry.description),
                date: (0, exports.parseDate)(entry.date),
                specialist: (0, exports.parseString)(entry.specialist),
                healthCheckRating: (0, exports.parseNumber)(entry.healthCheckRating),
            };
            if (entry.diagnosisCodes) {
                newHealthCheckEntry.diagnosisCodes = entry.diagnosisCodes;
            }
            return newHealthCheckEntry;
        case 'OccupationalHealthcare':
            const newOccupationalHealthCareEntry = {
                type: entry.type,
                description: (0, exports.parseString)(entry.description),
                date: (0, exports.parseDate)(entry.date),
                specialist: (0, exports.parseString)(entry.specialist),
                employerName: (0, exports.parseString)(entry.employerName),
            };
            if (entry.diagnosisCodes) {
                newOccupationalHealthCareEntry.diagnosisCodes = entry.diagnosisCodes;
            }
            if (entry.sickLeave) {
                newOccupationalHealthCareEntry.sickLeave = {
                    startDate: (0, exports.parseDate)(entry.sickLeave.startDate),
                    endDate: (0, exports.parseDate)(entry.sickLeave.endDate),
                };
            }
            return newOccupationalHealthCareEntry;
        default:
            return (0, types_1.assertNever)(entry);
    }
};
exports.toNewEntry = toNewEntry;
