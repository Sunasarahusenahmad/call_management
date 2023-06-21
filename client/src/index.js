import React from 'react';
import ReactDOM from 'react-dom';
import "./Assets/css/App.css"
import "./Assets/css/Dashboard.css"
import { BrowserRouter} from 'react-router-dom'
import App from './Routes/Dashboard/App';
import Institute from './Routes/Institute/Institute';
import Department from './Routes/Department/Department';
import Make from './Routes/Make/Make';
import Model from './Routes/Model/Model';
import Serialno from './Routes/Serialno/Serialno';
import Calltype from './Routes/Calltype/Calltype';
import CallMaster from './Routes/Callmaster/CallMaster';
import User from './Routes/User/User'

ReactDOM.render(
  <BrowserRouter>
      <App />
      <Institute />
      <Department />
      <Make />
      <Model />
      <Serialno />
      <Calltype />
      <CallMaster />
      <User />
  </BrowserRouter>,
  document.getElementById("root"))

