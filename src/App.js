import React, { useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import RoleControl from './components/RoleControl.js';
function App() {
  return (
    <div className='app'>
      <RoleControl />
    </div>
  );
}

export default App;
