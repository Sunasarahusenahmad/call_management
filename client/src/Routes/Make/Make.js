import React from "react";
import { Routes, Route } from "react-router-dom";
import Allmake from "../../Pages/Make/Allmake";
import Editmake from "../../Pages/Make/Editmake";

const Make = () => {
  return (
    <>
      <Routes>
        <Route path="/allmake" element={<Allmake />}></Route>
      </Routes>

      <Routes>
        <Route path="/editmake" element={<Editmake />}></Route>
      </Routes>
    </>
  );
};
export default Make;
