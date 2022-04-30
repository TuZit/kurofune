import React from 'react';
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import DefaultLayout from './pages/DefaultLayout.jsx';
import LoginLayout from './pages/authen/login/LoginLayout.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const isLogged = useSelector((state) => state.login.isLogged);
  return (
    <div className='app'>
      {isLogged === true && <DefaultLayout />}
      {isLogged === false && <LoginLayout />}
    </div>
  );
}

export default App;
