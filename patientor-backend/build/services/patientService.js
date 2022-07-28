"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../data/patients"));
const uuid_1 = require("uuid");
const patients = patients_1.default;
const getPatients = () => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};
const findPatientById = (id) => {
    const entry = patients.find((d) => d.id === id);
    return entry;
};
const addPatient = (entry) => {
    const newPatientEntry = Object.assign({ id: (0, uuid_1.v1)() }, entry);
    patients.push(newPatientEntry);
    return newPatientEntry;
};
const addEntry = (entry, id) => {
    const newEntry = Object.assign({ id: (0, uuid_1.v1)() }, entry);
    const objIndex = patients.findIndex((obj) => obj.id === id);
    patients[objIndex].entries.push(newEntry);
    return newEntry;
};
exports.default = {
    getPatients,
    addPatient,
    findPatientById,
    addEntry,
};
