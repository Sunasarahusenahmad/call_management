import React from "react";
import ReactDOM from "react-dom";
import "./Assets/css/App.css";
import "./Assets/css/Dashboard.css";
import { HashRouter } from "react-router-dom";
import App from "./Routes/Dashboard/App";
import Institute from "./Routes/Institute/Institute";
import Department from "./Routes/Department/Department";
import Make from "./Routes/Make/Make";
import Model from "./Routes/Model/Model";
import Serialno from "./Routes/Serialno/Serialno";
import Calltype from "./Routes/Calltype/Calltype";
import CallMaster from "./Routes/Callmaster/CallMaster";
import User from "./Routes/User/User";
import Report from "./Routes/Report/Reports";

// Redux Concept
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./Redux/UserReducer";

const store = configureStore({
  reducer: {
    users: UserReducer,
  },
});

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <App />
      <Institute />
      <Department />
      <Make />
      <Model />
      <Serialno />
      <Calltype />
      <CallMaster />
      <User />
      <Report />
    </HashRouter>
  </Provider>,
  document.getElementById("root")
);
