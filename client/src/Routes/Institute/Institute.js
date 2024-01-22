import React from "react";
import { Routes, Route } from "react-router-dom";
import AllInstitute from "../../Pages/Institute/AllInstitute";
import EditInstitute from "../../Pages/Institute/EditInstitute";

const Institute = () => {
  return (
    <>
      <Routes>
        <Route path="/allinstitute" element={<AllInstitute />}></Route>
      </Routes>

      <Routes>
        <Route path="/editinstitute" element={<EditInstitute />}></Route>
      </Routes>
    </>
  );
};
export default Institute;
