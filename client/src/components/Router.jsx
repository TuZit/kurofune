import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login.js';
import Register from './Register.jsx';
import RoleControl from './RoleControl.js';

function Router() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<RoleControl />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  );
}

export default Router;
