import React from "react";
import { Routes, Route } from "react-router-dom";
import Alluser from "../../Pages/User/Alluser";
import Edituser from "../../Pages/User/Edituser";

const Model = () => {
  return (
    <>
      <Routes>
        <Route path="/alluser" element={<Alluser />}></Route>
      </Routes>

      <Routes>
        <Route path="/edituser" element={<Edituser />}></Route>
      </Routes>
    </>
  );
};
export default Model;
