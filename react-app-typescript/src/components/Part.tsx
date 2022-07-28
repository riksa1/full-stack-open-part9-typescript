import { assertNever, CoursePart } from "../types";

const Part = ({ part }: { part: CoursePart }) => {
  const paragraphStyle = {
    padding: 0,
    margin: 0,
  };
  switch (part.type) {
    case "normal":
      return (
        <>
          <h4 style={paragraphStyle}>
            {part.name} {part.exerciseCount}
          </h4>
          <p style={paragraphStyle}>{part.description}</p>
          <br />
        </>
      );
    case "groupProject":
      return (
        <>
          <h4 style={paragraphStyle}>
            {part.name} {part.exerciseCount}
          </h4>
          <p style={paragraphStyle}>project exercises {part.groupProjectCount}</p>
          <br />
        </>
      );
    case "submission":
      return (
        <>
          <h4 style={paragraphStyle}>
            {part.name} {part.exerciseCount}
          </h4>
          <p style={paragraphStyle}>{part.description}</p>
          <p style={paragraphStyle}>submit to {part.exerciseSubmissionLink}</p>
          <br />
        </>
      );
    case "special":
      return (
        <div>
          <h4 style={paragraphStyle}>
            {part.name} {part.exerciseCount}
          </h4>
          <p style={paragraphStyle}>{part.description}</p>
          <>required skills: {part.requirements.map((requirement: string) => requirement + ", ")}</>
          <br />
        </div>
      );
    default:
      return assertNever(part);
  }
};

export default Part;
