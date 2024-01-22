import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../../Pages/Dashboard/Dashboard";
import UserLogin from "../../Pages/Dashboard/UserLogin";
import AdminLogin from "../../Pages/Dashboard/AdminLogin";
import UserRegister from "../../Pages/Dashboard/UserRegister";

const App = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<UserLogin />}></Route>
      </Routes>

      <Routes>
        <Route path="/admin" element={<AdminLogin />}></Route>
      </Routes>

      <Routes>
        <Route path="/admin-dashboard" element={<Dashboard />}></Route>
      </Routes>

      <Routes>
        <Route exact path="/user-register" element={<UserRegister />}></Route>
      </Routes>
    </>
  );
};
export default App;
