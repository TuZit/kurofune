import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginActions } from '../store/loginSlice.js';
import './LoginPage.scss';

export default function Login() {
  // const [user, setUser] = useState({ username: '', password: '' });
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const axiosJWT = axios.create();

  // const refreshToken = async () => {
  //   try {
  //     const res = await axios.post('/refresh', { token: user.refresh_token });
  //     setUser({
  //       ...user,
  //       access_token: res.data.access_token,
  //       refresh_token: res.data.refresh_token,
  //     });
  //     return res.data;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // axiosJWT.interceptors.request.use(
  //   async (config) => {
  //     let currentDate = new Date();
  //     const decodedToken = jwt_decode(user.access_token);
  //     if (decodedToken.exp * 1000 < currentDate.getTime()) {
  //       const data = await refreshToken();
  //       config.headers['authorization'] = 'Bearer ' + data.access_token;
  //     }
  //     return config;
  //   },
  //   (error) => {
  //     return Promise.reject(error);
  //   }
  // );

  // Login function
  const login = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/v1/auth/login', {
        username,
        password,
      });

      localStorage.setItem(
        'accessToken',
        JSON.stringify({
          accessToken: res.data.accessToken,
        })
      );
      dispatch(loginActions.login());
      setError('');
      navigate('/');
    } catch (err) {
      // console.log(err.res.message);
      // console.log(err.res);
      setError('Invalid Username/Password');
    }
  };

  // Submit func
  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };

  return (
    <div id='loginPage'>
      <div className='loginPage__container'>
        <h3>Log In</h3>
        <p className='login-msg'>{error}</p>
        <form onSubmit={handleSubmit}>
          <div className='loginPage__formItems'>
            <label>Your User name *</label>
            <input
              type='text'
              id='username'
              name='username'
              placeholder='Enter your email'
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div className='loginPage__formItems'>
            <label>Your Password *</label>
            <input
              type='text'
              id='password'
              name='password'
              placeholder='Enter your password'
              autoComplete='on'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className='btn'>SUBMIT</button>
        </form>

        <div className='to-signUp'>
          <span>Don't have account yet ? </span>
          <span
            style={{ color: 'red', cursor: 'pointer' }}
            onClick={(e) => {
              navigate('/register');
              dispatch(loginActions.login());
            }}
          >
            Let's sign up with us ! (Register here)
          </span>
        </div>
      </div>
    </div>
  );
}
