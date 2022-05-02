import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import LoginForm from '../login/LoginForm.jsx';
import RegisterForm from '../register/RegisterForm.jsx';
import { ToastContainer } from 'react-toastify';

import './style.scss';

function AuthLayout() {
  const [redirectPart, setRedirectPart] = useState(true);
  return (
    <div className='auth-layout' limit='1'>
      <ToastContainer theme='colored' />
      <div className='layout-left'>
        <img
          src='https://pharma.its-globaltek.com/wp-content/themes/pharmacy/assets/imgs/bg_login-register.jpg'
          alt='logo'
        ></img>
      </div>
      <div className='layout-right'>
        <div className='form-input h-100'>
          <Outlet></Outlet>
          {redirectPart && <LoginForm setRedirectPart={setRedirectPart} />}
          {!redirectPart && <RegisterForm setRedirectPart={setRedirectPart} />}
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
