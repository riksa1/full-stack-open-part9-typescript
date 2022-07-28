import React from "react";
import { assertNever, Entry } from "../types";
import HealthCheckEntryPage from "./HealthCheckEntryPage";
import HospitalEntryPage from "./HospitalEntryPage";
import OccupationalHealthcareEntryPage from "./OccupationalHealtcareEntryPage";

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryPage entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntryPage entry={entry} />;
    case "HealthCheck":
      return <HealthCheckEntryPage entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
