import React from "react";
import { Routes, Route } from "react-router-dom";
import Allmodel from "../../Pages/Model/Allmodel";
import Editmodel from "../../Pages/Model/Editmodel";

const Model = () => {
  return (
    <>
      <Routes>
        <Route path="/allmodel" element={<Allmodel />}></Route>
      </Routes>

      <Routes>
        <Route path="/editmodel" element={<Editmodel />}></Route>
      </Routes>
    </>
  );
};
export default Model;
