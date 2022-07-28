import { CoursePart } from "../types";
import Part from "./Part";

const Content = ({ courseParts }: { courseParts: CoursePart[] }): JSX.Element => {
  return (
    <div>
      {courseParts.map((part: CoursePart) => (
        <Part part={part} key={part.name} />
      ))}
    </div>
  );
};

export default Content;
