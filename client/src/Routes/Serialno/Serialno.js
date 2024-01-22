import React from "react";
import { Routes, Route } from "react-router-dom";
import Allserialno from "../../Pages/Serialno/Allserialno";
import Editserialno from "../../Pages/Serialno/Editserialno";

const Serialno = () => {
  return (
    <>
      <Routes>
        <Route path="/allserialno" element={<Allserialno />}></Route>
      </Routes>

      <Routes>
        <Route path="/editserialno" element={<Editserialno />}></Route>
      </Routes>
    </>
  );
};
export default Serialno;
