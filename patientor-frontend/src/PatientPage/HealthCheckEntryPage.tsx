import { Typography } from "@material-ui/core";
import { HealthCheckEntry } from "../types";
import { useStateValue } from "../state";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import FavoriteIcon from "@mui/icons-material/Favorite";

const HealthCheckEntryPage = ({ entry }: { entry: HealthCheckEntry }) => {
  const [{ diagnosis }] = useStateValue();
  return (
    <div style={{ borderStyle: "solid", borderRadius: 10 }}>
      <div style={{ marginLeft: 22 }}>
        <Typography>
          {entry.date} <LocalHospitalIcon />
        </Typography>
        <Typography>{entry.description}</Typography>
        <FavoriteIcon
          sx={{
            color:
              entry.healthCheckRating === 0 ? "green" : entry.healthCheckRating === 1 ? "yellow" : entry.healthCheckRating === 2 ? "orange" : "red",
          }}
        />
        <Typography>diagnose by {entry.specialist}</Typography>
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

export default HealthCheckEntryPage;
