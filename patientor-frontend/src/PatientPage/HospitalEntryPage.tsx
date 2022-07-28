import { Typography } from "@material-ui/core";
import { HospitalEntry } from "../types";
import { useStateValue } from "../state";
import MedicationIcon from "@mui/icons-material/Medication";

const HospitalEntryPage = ({ entry }: { entry: HospitalEntry }) => {
  const [{ diagnosis }] = useStateValue();
  return (
    <div style={{ borderStyle: "solid", borderRadius: 10 }}>
      <div style={{ marginLeft: 22 }}>
        <Typography>
          {entry.date} <MedicationIcon />
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

export default HospitalEntryPage;
