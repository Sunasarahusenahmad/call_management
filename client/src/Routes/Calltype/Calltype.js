import React from "react";
import { Routes, Route } from "react-router-dom";
import AllCalltype from "../../Pages/Calltype/AllCalltype";
import EditCalltype from "../../Pages/Calltype/EditCalltype";

const Calltype = () => {
  return (
    <>
      <Routes>
        <Route path="/allcalltype" element={<AllCalltype />}></Route>
      </Routes>

      <Routes>
        <Route path="/editcalltype" element={<EditCalltype />}></Route>
      </Routes>
    </>
  );
};
export default Calltype;
