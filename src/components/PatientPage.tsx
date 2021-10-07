import React, { useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";
import { useStateValue } from "../state";
import { updatePatient } from "../state";

const PatientPage = () => {
  const {id} = useParams<{id: string}>();
  const [{ patients, diagnoses }, dispatch] = useStateValue();

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
      {patients[id] ?
        <>
            <h1>{patients[id].name}</h1>
            <div>{`gender: ${patients[id].gender}`}</div>
            <div>{`ssn: ${patients[id]?.ssn || ""}`}</div>
            <div>{`occupation: ${patients[id].occupation}`}</div>
            <br/>
            <b>{patients[id].entries?.length > 0 && "entries"}</b>
            {
              patients[id].entries?.map(entry => (
                <div key={entry.id}>
                  <div>{entry.date}</div>
                  <i>{entry.description}</i><br/>
                  {entry.diagnosisCodes &&
                    <div>codes:<ul>
                    {entry.diagnosisCodes?.map(code =>
                      <li key={code}>
                        <div>{code} {Object.values(diagnoses).find(d => d.code === code)?.name}</div>
                      </li>)}
                    </ul></div>}
                  <br/>
                </div>
              ))
            }
        </>
    : <></>}
    </>
  );
};

export default PatientPage;
