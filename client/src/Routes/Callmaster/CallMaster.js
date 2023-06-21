import React from 'react';
import { Routes, Route } from 'react-router-dom'
import AddCall from '../../Pages/Callmaster/AddCall';
import AllCall from '../../Pages/Callmaster/AllCall';
import EditCall from '../../Pages/Callmaster/EditCall';
import SendMail from '../../Pages/Callmaster/SendMail';
import GenerateReport from '../../Pages/Callmaster/GenerateReport'

const CallMaster = () => {
    
    return (
        <>
            <Routes>
                <Route path="/addcall" element={<AddCall />}></Route>
            </Routes>

            <Routes>
                <Route path="/allcall" element={<AllCall />}></Route>
            </Routes>

            <Routes>
                <Route path="/editcall" element={<EditCall />}></Route>
            </Routes>

            <Routes>
                <Route path="/sendmail" element={<SendMail />}></Route>
            </Routes>

            <Routes>
                <Route path="/generatereport" element={<GenerateReport />}></Route>
            </Routes>

        </>
    );
}
export default CallMaster;
