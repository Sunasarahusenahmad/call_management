import React from "react";
import { Routes, Route } from "react-router-dom";
import Alldepartment from "../../Pages/Department/Alldepartment";
import Editdepartment from "../../Pages/Department/Editdepartment";

const Department = () => {
  return (
    <>
      <Routes>
        <Route path="/alldepartment" element={<Alldepartment />}></Route>
      </Routes>

      <Routes>
        <Route path="/editdepartment" element={<Editdepartment />}></Route>
      </Routes>
    </>
  );
};
export default Department;
