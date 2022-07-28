import React from "react";
import { Grid, Button, Typography } from "@material-ui/core";
import { Field, Formik, Form } from "formik";
import { TextField, TypeSelectField, DiagnosisSelection, HealthCheckRatingSelectField } from "../AddPatientModal/FormField";
import { NewEntry } from "../types";
import { useStateValue } from "../state";

export type EntryFormValue = NewEntry;

interface Props {
  onSubmit: (values: EntryFormValue) => void;
  onCancel: () => void;
}

const typeOptions = [
  { value: "HealthCheck", label: "HealthCheck" },
  { value: "Hospital", label: "Hospital" },
  { value: "OccupationalHealthcare", label: "OccupationalHealthcare" },
];

const healthCheckRatingOptions = [
  { value: 0, label: "Healthy" },
  { value: 1, label: "LowRisk" },
  { value: 2, label: "HighRisk" },
  { value: 3, label: "CriticalRisk" },
];

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnosis }] = useStateValue();
  return (
    <>
      <Formik
        initialValues={{
          type: "HealthCheck",
          description: "",
          date: "",
          specialist: "",
          healthCheckRating: 0,
          employerName: "",
          diagnosisCodes: [],
          startDate: "",
          endDate: "",
          dischargeCriteria: "",
          dischargeDate: "",
        }}
        onSubmit={(values) => {
          if (values.type === "HealthCheck") {
            const returnValues: EntryFormValue = {
              type: "HealthCheck",
              description: values.description,
              date: values.date,
              specialist: values.specialist,
              healthCheckRating: Number(values.healthCheckRating),
            };
            if (values.diagnosisCodes.length > 0) {
              returnValues.diagnosisCodes = values.diagnosisCodes;
            }
            onSubmit(returnValues);
          } else if (values.type === "Hospital") {
            const returnValues: EntryFormValue = {
              type: "Hospital",
              description: values.description,
              date: values.date,
              specialist: values.specialist,
              discharge: { criteria: values.dischargeCriteria, date: values.dischargeDate },
            };
            if (values.diagnosisCodes.length > 0) {
              returnValues.diagnosisCodes = values.diagnosisCodes;
            }
            onSubmit(returnValues);
          } else {
            const returnValues: EntryFormValue = {
              type: "OccupationalHealthcare",
              description: values.description,
              date: values.date,
              specialist: values.specialist,
              employerName: values.employerName,
            };
            if (values.diagnosisCodes.length > 0) {
              returnValues.diagnosisCodes = values.diagnosisCodes;
            }
            if (values.startDate !== "" && values.endDate !== "") {
              returnValues.sickLeave = { startDate: values.startDate, endDate: values.endDate };
            }
            onSubmit(returnValues);
          }
        }}
        validate={(values) => {
          const requiredError = "Field is required";
          const errors: { [field: string]: string } = {};
          if (!values.description) {
            errors.description = requiredError;
          }
          if (!values.date) {
            errors.date = requiredError;
          }
          if (!values.specialist) {
            errors.specialist = requiredError;
          }
          if (values.type === "Hospital" && !values.dischargeCriteria) {
            errors.dischargeCriteria = requiredError;
          }
          if (values.type === "Hospital" && !values.dischargeDate) {
            errors.dischargeDate = requiredError;
          }
          if (values.type === "OccupationalHealthcare" && !values.employerName) {
            errors.employerName = requiredError;
          }
          if (values.type === "OccupationalHealthcare" && !values.startDate && values.endDate) {
            errors.startDate = requiredError;
          }
          if (values.type === "OccupationalHealthcare" && !values.endDate && values.startDate) {
            errors.endDate = requiredError;
          }
          return errors;
        }}
      >
        {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
          return (
            <Form className="form ui">
              <TypeSelectField label="Type" name="type" options={typeOptions} />
              <Field label="Description" placeholder="Description" name="description" component={TextField} />
              <Field label="Date" placeholder="YYYY-MM-DD" name="date" component={TextField} />
              <Field label="Specialist" placeholder="Specialist" name="specialist" component={TextField} />
              <DiagnosisSelection setFieldValue={setFieldValue} setFieldTouched={setFieldTouched} diagnoses={Object.values(diagnosis)} />
              {values.type === "HealthCheck" && (
                <HealthCheckRatingSelectField label="HealtCheck Rating" name="healthCheckRating" options={healthCheckRatingOptions} />
              )}
              {values.type === "Hospital" && (
                <>
                  <Typography>Discharge</Typography>
                  <Field label="Discharge Date" placeholder="Discharge Date" name="dischargeDate" component={TextField} />
                  <Field label="Discharge Criteria" placeholder="Discharge Criteria" name="dischargeCriteria" component={TextField} />
                </>
              )}
              {values.type === "OccupationalHealthcare" && (
                <>
                  <Field label="Employer Name" placeholder="Employer Name" name="employerName" component={TextField} />
                  <Typography>Sick Leave</Typography>
                  <Field label="Start Date" placeholder="Start Date" name="startDate" component={TextField} />
                  <Field label="End Date" placeholder="End Date" name="endDate" component={TextField} />
                </>
              )}
              <Grid>
                <Grid item>
                  <Button color="secondary" variant="contained" style={{ float: "left" }} type="button" onClick={onCancel}>
                    Cancel
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    style={{
                      float: "right",
                    }}
                    type="submit"
                    variant="contained"
                    disabled={!dirty || !isValid}
                  >
                    Add
                  </Button>
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default AddEntryForm;
