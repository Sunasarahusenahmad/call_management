import React from 'react';
import { Routes, Route } from 'react-router-dom'
import AddCalltype from '../../Pages/Calltype/AddCalltype';
import AllCalltype from '../../Pages/Calltype/AllCalltype';
import EditCalltype from '../../Pages/Calltype/EditCalltype';

const Calltype = () => {
    
    return (
        <>
            <Routes>
                <Route path="/addcalltype" element={<AddCalltype />}></Route>
            </Routes>

            <Routes>
                <Route path="/allcalltype" element={<AllCalltype />}></Route>
            </Routes>

            <Routes>
                <Route path="/editcalltype" element={<EditCalltype />}></Route>
            </Routes>
        </>
    );
}
export default Calltype;
