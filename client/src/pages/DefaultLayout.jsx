import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RoleControl from '../components/RoleControl.js';
import RegisterLayout from './authen/register/RegisterLayout.js';
import AuthLayout from './authen/authLayout/index.js';
import PostDashboard from './post/PostDashboard.jsx';

function DefaultLayout() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<RoleControl />} />
        <Route path='/register' element={<RegisterLayout />} />
        {/* <Route path='/login' element={<LoginLayout />} /> */}
        <Route path='/login' element={<AuthLayout />} />
        <Route path='/post' element={<PostDashboard />} />
      </Routes>
    </div>
  );
}

export default DefaultLayout;
