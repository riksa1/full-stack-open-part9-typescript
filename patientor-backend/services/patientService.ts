import patientData from '../data/patients';
import { v1 as uuid } from 'uuid';
import {
  Patient,
  NewPatientEntry,
  PublicPatient,
  Entry,
  NewEntry,
} from '../types';

const patients: Array<Patient> = patientData;

const getPatients = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const findPatientById = (id: string): Patient | undefined => {
  const entry = patients.find((d) => d.id === id);
  return entry;
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatientEntry: Patient = {
    id: uuid(),
    ...entry,
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntry = (entry: NewEntry, id: string): Entry => {
  const newEntry: Entry = {
    id: uuid(),
    ...entry,
  };

  const objIndex: number = patients.findIndex((obj) => obj.id === id);

  patients[objIndex].entries.push(newEntry);
  return newEntry;
};

export default {
  getPatients,
  addPatient,
  findPatientById,
  addEntry,
};
