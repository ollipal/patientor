import { State } from "./state";
import { Diagnosis, Entry, Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "UPDATE_PATIENT";
      payload: Patient;
  }
  | {
      type: "SET_DIAGNOSES_LIST";
      payload: Diagnosis[];
  }
  | {
    type: "ADD_ENTRY";
    payload: Entry;
    id: string;
  };

export const setPatientList = (patients : Patient[]): Action => {
  return { type: "SET_PATIENT_LIST", payload: patients };
};

export const setDiagnosesList = (diagnoses : Diagnosis[]): Action => {
  return { type: "SET_DIAGNOSES_LIST", payload: diagnoses };
};

export const addPatient = (patient : Patient): Action => {
  return { type: "ADD_PATIENT", payload: patient };
};

export const addEntry = (entry : Entry, id: string): Action => {
  return { type: "ADD_ENTRY", payload: entry, id };
};

export const updatePatient = (patient : Patient): Action => {
  return { type: "UPDATE_PATIENT", payload: patient };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "UPDATE_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: { ...state.patients[action.payload.id], ...action.payload }
        }
      };
    case "SET_DIAGNOSES_LIST":
      return {
        ...state,
        diagnoses: {
          ...action.payload,
          ...state.diagnoses
        }
      };
    case "ADD_ENTRY":
      const patient = state.patients[action.id];
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.id]: { ...patient, entries: patient.entries.concat(action.payload) }
        }
      };
    default:
      return state;
  }
};
