import { Typography } from "@material-ui/core";
import { OccupationalHealthcareEntry } from "../types";
import { useStateValue } from "../state";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";

const OccupationalHealthcareEntryPage = ({ entry }: { entry: OccupationalHealthcareEntry }) => {
  const [{ diagnosis }] = useStateValue();
  return (
    <div style={{ borderStyle: "solid", borderRadius: 10 }}>
      <div style={{ marginLeft: 22 }}>
        <Typography>
          {entry.date} <MedicalInformationIcon />
        </Typography>
        <Typography>{entry.description}</Typography>
        <>
          {entry?.diagnosisCodes?.map((code: string) => (
            <li key={code}>
              {code} {diagnosis[code] ? diagnosis[code].name : null}
            </li>
          ))}
        </>
        <br />
      </div>
    </div>
  );
};

export default OccupationalHealthcareEntryPage;
