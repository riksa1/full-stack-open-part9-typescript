import { State } from "./state";
import { Diagnosis, Entry, Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "SET_DIAGNOSIS_LIST";
      payload: Diagnosis[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_SINGLE_PATIENT";
      payload: Patient;
    }
  | {
      type: "ADD_ENTRY";
      payload: { entry: Entry; patientId: string };
    };

export const setPatientList = (patientFromListApi: Array<Patient>): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patientFromListApi,
  };
};

export const setDiagnosisList = (diagnosisFromListApi: Array<Diagnosis>): Action => {
  return {
    type: "SET_DIAGNOSIS_LIST",
    payload: diagnosisFromListApi,
  };
};

export const addPatient = (patient: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: patient,
  };
};

export const setSinglePatient = (patient: Patient): Action => {
  return {
    type: "SET_SINGLE_PATIENT",
    payload: patient,
  };
};

export const addEntry = ({ entry, patientId }: { entry: Entry; patientId: string }): Action => {
  return {
    type: "ADD_ENTRY",
    payload: { entry: entry, patientId: patientId },
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce((memo, patient) => ({ ...memo, [patient.id]: patient }), {}),
          ...state.patients,
        },
      };
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnosis: {
          ...action.payload.reduce((memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }), {}),
          ...state.diagnosis,
        },
      };
    case "SET_SINGLE_PATIENT":
      return {
        ...state,
        singlePatients: {
          ...state.singlePatients,
          [action.payload.id]: action.payload,
        },
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case "ADD_ENTRY":
      return {
        ...state,
        singlePatients: {
          ...state.singlePatients,
          [action.payload.patientId]: {
            ...state.singlePatients[action.payload.patientId],
            entries: [...state.singlePatients[action.payload.patientId].entries, action.payload.entry],
          },
        },
      };
    default:
      return state;
  }
};
