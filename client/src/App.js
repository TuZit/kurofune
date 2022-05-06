import React from 'react';
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate, Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import RoleControl from './components/RoleControl.js';
import LoginForm from './pages/authen/login/LoginForm.jsx';
import RegisterForm from './pages/authen/register/RegisterForm.jsx';
import PostDashboard from './pages/post/PostDashboard.jsx';
import AuthLayout from './pages/authen/authLayout/index.js';
import DefaultLayout from './pages/DefaultLayout.jsx';

function App() {
  const isSuccess = JSON.parse(localStorage.getItem('login'));
  const isLogged = useSelector((state) => state.login.isLogged);

  return (
    <div className='app'>
      <Routes>
        <Route
          path='/'
          element={
            // isSuccess && isSuccess.success === true
            isSuccess?.success === true || isLogged === true ? (
              <RoleControl />
            ) : (
              <Navigate to='auth/login' />
            )
          }
        />
        <Route path='/auth' element={<AuthLayout />}>
          <Route path='login' element={<LoginForm />} />
          <Route path='register' element={<RegisterForm />} />
        </Route>
        <Route path='/post' element={<PostDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
