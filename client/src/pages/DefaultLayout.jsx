import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RoleControl from '../components/RoleControl.js';
import LoginLayout from './authen/login/LoginLayout.jsx';
import RegisterLayout from './authen/register/RegisterLayout.js';
import AuthLayout from './authen/authLayout/index.js';

function DefaultLayout() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<RoleControl />} />
        <Route path='/register' element={<RegisterLayout />} />
        {/* <Route path='/login' element={<LoginLayout />} /> */}
        <Route path='/login' element={<AuthLayout />} />
      </Routes>
    </div>
  );
}

export default DefaultLayout;
