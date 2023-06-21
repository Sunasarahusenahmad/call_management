import React from 'react';
import { Routes, Route } from 'react-router-dom'
import Adddepartment from '../../Pages/Department/Adddepartment';
import Alldepartment from '../../Pages/Department/Alldepartment';
import Editdepartment from '../../Pages/Department/Editdepartment';

const Department = () => {
    
    return (
        <>
            <Routes>
                <Route path="/adddepartment" element={<Adddepartment />}></Route>
            </Routes>

            <Routes>
                <Route path="/alldepartment" element={<Alldepartment />}></Route>
            </Routes>

            <Routes>
                <Route path="/editdepartment" element={<Editdepartment />}></Route>
            </Routes>

        </>
    );
}
export default Department;
