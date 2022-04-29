import React from 'react';
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login.js';
import DefaultLayout from './pages/DefaultLayout.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  // const [isLogin, setIsLogin] = useState(false);
  const isLogged = useSelector((state) => state.login.isLogged);
  return (
    <div className='app'>
      {isLogged === true && <DefaultLayout />}
      {isLogged === false && <Login />}
    </div>
  );
}

export default App;
