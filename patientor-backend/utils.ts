import {
  Gender,
  NewPatientEntry,
  assertNever,
  NewEntry,
  Diagnosis,
} from './types';

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isNumber = (number: unknown): number is number => {
  return typeof number === 'number';
};

const isArray = (array: unknown): array is string[] => {
  return (
    Array.isArray(array) &&
    array.every((element) => typeof element === 'string')
  );
};

export const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

export const parseString = (string: unknown): string => {
  if (!string || !isString(string)) {
    throw new Error('Incorrect or missing string');
  }

  return string;
};

export const parseNumber = (number: unknown): number => {
  if ((!number && number !== 0) || !isNumber(number)) {
    throw new Error('Incorrect or missing number');
  }

  return number;
};

export const parseArray = (array: unknown): object => {
  if (!array || !isArray(array)) {
    throw new Error('Incorrect or missing array');
  }

  return array;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

type PatientFields = {
  name: unknown;
  dateOfBirth: unknown;
  gender: unknown;
  ssn: unknown;
  occupation: unknown;
};

interface BaseEntryFields {
  description: unknown;
  date: unknown;
  specialist: unknown;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

interface HospitalEntryFields extends BaseEntryFields {
  type: 'Hospital';
  discharge: { criteria: unknown; date: unknown };
}

interface HealthCheckEntryFields extends BaseEntryFields {
  type: 'HealthCheck';
  healthCheckRating: unknown;
}

interface OccupationalHealthcareEntryFields extends BaseEntryFields {
  type: 'OccupationalHealthcare';
  employerName: unknown;
  sickLeave?: { startDate: unknown; endDate: unknown };
}

type EntryFields =
  | HospitalEntryFields
  | HealthCheckEntryFields
  | OccupationalHealthcareEntryFields;

const toNewPatientEntry = ({
  name,
  dateOfBirth,
  gender,
  ssn,
  occupation,
}: PatientFields): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseString(name),
    dateOfBirth: parseDate(dateOfBirth),
    gender: parseGender(gender),
    ssn: parseString(ssn),
    occupation: parseString(occupation),
    entries: [],
  };

  return newEntry;
};

const toNewEntry = (entry: EntryFields): NewEntry => {
  switch (entry.type) {
    case 'Hospital':
      const newHospitalEntry: NewEntry = {
        type: entry.type,
        description: parseString(entry.description),
        date: parseDate(entry.date),
        specialist: parseString(entry.specialist),
        discharge: {
          date: parseDate(entry.discharge.date),
          criteria: parseString(entry.discharge.criteria),
        },
      };
      if (entry.diagnosisCodes) {
        newHospitalEntry.diagnosisCodes = entry.diagnosisCodes;
      }

      return newHospitalEntry;
    case 'HealthCheck':
      const newHealthCheckEntry: NewEntry = {
        type: entry.type,
        description: parseString(entry.description),
        date: parseDate(entry.date),
        specialist: parseString(entry.specialist),
        healthCheckRating: parseNumber(entry.healthCheckRating),
      };
      if (entry.diagnosisCodes) {
        newHealthCheckEntry.diagnosisCodes = entry.diagnosisCodes;
      }

      return newHealthCheckEntry;
    case 'OccupationalHealthcare':
      const newOccupationalHealthCareEntry: NewEntry = {
        type: entry.type,
        description: parseString(entry.description),
        date: parseDate(entry.date),
        specialist: parseString(entry.specialist),
        employerName: parseString(entry.employerName),
      };
      if (entry.diagnosisCodes) {
        newOccupationalHealthCareEntry.diagnosisCodes = entry.diagnosisCodes;
      }
      if (entry.sickLeave) {
        newOccupationalHealthCareEntry.sickLeave = {
          startDate: parseDate(entry.sickLeave.startDate),
          endDate: parseDate(entry.sickLeave.endDate),
        };
      }

      return newOccupationalHealthCareEntry;
    default:
      return assertNever(entry);
  }
};

export { toNewPatientEntry, toNewEntry };
