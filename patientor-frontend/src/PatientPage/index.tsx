import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import axios from "axios";
import { Entry, Gender, Patient } from "../types";
import { addEntry, useStateValue } from "../state";
import { Typography, Button } from "@material-ui/core";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import EntryDetails from "./EntryDetails";
import AddEntryModal from "../AddEntryModal";
import { EntryFormValue } from "../AddEntryModal/index";

const index = () => {
  const [{ singlePatients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = React.useState<Patient>({ id: "", name: "", occupation: "", gender: Gender.Male, entries: [] });
  const [error, setError] = React.useState<string>();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValue) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(`${apiBaseUrl}/patients/${patient.id}/entries`, values);
      dispatch(addEntry({ entry: newEntry, patientId: patient.id }));
      const newPatient: Patient = {
        ...patient,
        entries: [...patient.entries, newEntry],
      };
      setPatient(newPatient);
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(String(e?.response?.data) || "Unrecognized axios error");
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  if (!id) {
    return null;
  }

  useEffect(() => {
    const fetchPatientList = async () => {
      try {
        if (id in singlePatients) {
          setPatient(singlePatients[id]);
        } else {
          const { data: patientFromApi } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
          if (patientFromApi) {
            setPatient(patientFromApi);
            dispatch({ type: "SET_SINGLE_PATIENT", payload: patientFromApi });
          }
        }
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatientList();
  }, []);
  return (
    <>
      {patient ? (
        <div className="App">
          <br />
          <br />
          <Typography variant="h4">
            {patient.name} {patient.gender === "male" ? <MaleIcon /> : patient.gender === "female" ? <FemaleIcon /> : null}
          </Typography>
          <br />
          <Typography variant="h6">ssh: {patient.ssn}</Typography>
          <Typography variant="h6">occupation: {patient.occupation}</Typography>
          <br />
          <br />
          <Typography variant="h5">entries</Typography>
          {patient.entries.length === 0 ? (
            <>
              <br />
              <Typography>None found</Typography>
              <br />
            </>
          ) : (
            <div>
              <br />
              {patient.entries.map((entry: Entry) => (
                <div key={entry.id}>
                  <EntryDetails entry={entry} />
                  <br />
                </div>
              ))}
            </div>
          )}
          <AddEntryModal modalOpen={modalOpen} onSubmit={submitNewEntry} error={error} onClose={closeModal} />
          <Button variant="contained" style={{ backgroundColor: "lightblue" }} onClick={() => openModal()}>
            Add New Entry
          </Button>
        </div>
      ) : null}
    </>
  );
};

export default index;
