import React, { useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";
import { useStateValue } from "../state";
import { updatePatient } from "../state";

const PatientPage = () => {
    const {id} = useParams<{id: string}>();
    const [{ patients }, dispatch] = useStateValue();

    useEffect(() => {    
        const fetchPatientList = async () => {
          try {
            const { data: patientData } = await axios.get<Patient>(
              `${apiBaseUrl}/patients/${id}`
            );
            dispatch(updatePatient(patientData));
          } catch (e) {
            console.error(e);
          }
        };
        if (!patients[id]?.ssn) { // only call if required
          void fetchPatientList();
        }
      }, []);
  return (
    <>
      <h1>{patients[id] && patients[id].name}</h1>
      <div>{patients[id]?.gender && `gender: ${patients[id].gender}`}</div>
      <div>{patients[id]?.ssn && `ssn: ${patients[id]?.ssn || "not available"}`}</div>
      <div>{patients[id]?.occupation && `occupation: ${patients[id].occupation}`}</div>
    </>
  );
};

export default PatientPage;
