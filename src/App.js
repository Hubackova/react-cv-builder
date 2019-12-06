import React, { useState } from "react";

import WorkExpForm from "./sections/workExperience/components/Form";
import { Dropzone } from "./shared";
import "./App.css";

function App() {
  const [cvData, setCvData] = useState();

  return (
    <div className="App">
      <Dropzone onUpload={e => setCvData(e)} />
      <hr />
      {cvData ? <WorkExpForm cvData={cvData} /> : "Nahrejte životopis..."}
    </div>
  );
}

export default App;
