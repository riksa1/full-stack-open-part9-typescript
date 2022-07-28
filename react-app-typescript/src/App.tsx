import Header from "./components/Header";
import Total from "./components/Total";
import Content from "./components/Content";
import { courseParts } from "./types";

const App = () => {
  const courseName = "Half Stack application development";

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;
