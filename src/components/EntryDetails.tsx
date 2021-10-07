import React  from "react";
import { Diagnosis, Entry} from "../types";
import HealtchCheckEntry from "./HealtchCheckEntry";
import HospitalEntry from "./HospitalEntry";
import OccupationalEntry from "./OccupationalEntry";

/**
 * Helper function for exhaustive type checking
 */
 const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails = ({entry, diagnoses} : {entry : Entry, diagnoses : Diagnosis[]}) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntry entry={entry} diagnoses={diagnoses}/>;
    case "OccupationalHealthcare":
      return <OccupationalEntry entry={entry} diagnoses={diagnoses}/>;
    case "HealthCheck":
      return <HealtchCheckEntry entry={entry} diagnoses={diagnoses}/>;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
