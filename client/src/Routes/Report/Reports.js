import React from "react";
import { Routes, Route } from "react-router-dom";
import Report from "../../Pages/Report/Reports";

const Reports = () => {
  return (
    <>
      <Routes>
        <Route path="/reports" element={<Report />}></Route>
      </Routes>
    </>
  );
};
export default Reports;
