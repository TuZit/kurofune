import React, { useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import RoleControl from './components/RoleControl.js';
function App() {
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(
          'https://62642ce498095dcbf92c71ce.mockapi.io/api/users'
        );
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    // getData();
  }, []);
  return (
    <div className='app'>
      <RoleControl />
    </div>
  );
}

export default App;
