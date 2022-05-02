import React from 'react';
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import DefaultLayout from './pages/DefaultLayout.jsx';
import AuthLayout from './pages/authen/authLayout/index.js';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const isLogged = useSelector((state) => state.login.isLogged);
  return (
    <div className='app'>
      {isLogged === true && <DefaultLayout />}
      {isLogged === false && <AuthLayout />}
    </div>
  );
}

export default App;
