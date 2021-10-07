import React, { useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Entry, Patient } from "../types";
import { addEntry, useStateValue } from "../state";
import { updatePatient } from "../state";
import EntryDetails from "./EntryDetails";
import { AddEntryModal } from "../AddPatientModal";
import { Button } from "semantic-ui-react";
import { EntryFormValues } from "../AddPatientModal/AddEntryForm";

const PatientPage = () => {
  const {id} = useParams<{id: string}>();
  const [{ patients, diagnoses }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();


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
    void fetchPatientList();
  }, []);

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewPatient = async (values: EntryFormValues) => {
    try {
      const { data: newPatient } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addEntry(newPatient, id));
      closeModal();
    } catch (e) {
      console.error(e.response?.data || 'Unknown Error');
      setError(e.response?.data?.error || 'Unknown error');
    }
  };

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
                <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses}/>
              ))
            }
        </>
    : <></>}
    <AddEntryModal
      modalOpen={modalOpen}
      onSubmit={submitNewPatient}
      error={error}
      onClose={closeModal}
    />
    <Button onClick={() => openModal()}>Add New Entry</Button>
    </>
  );
};

export default PatientPage;
