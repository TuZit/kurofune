import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';

import './style.scss';
import { loginActions } from '../../../store/loginSlice.js';

function LoginForm({ setRedirectPart }) {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      navigate('/');
    } catch (err) {
      toast.error('User Name/ Password Incorrect');
      console.log(err);
    }
  };

  // Submit func
  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };

  return (
    <>
      {/* Login Body */}
      <div className='register-container'>
        <div className='header-register'>
          <h4 className='title'>組織名</h4>
          <p>アカウントの作成を完了してください</p>
        </div>

        <form id='loginForm' onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='UserName'>Tên tài khoản</label>
            <input
              type='text'
              className='form-control-auth'
              id='UserName'
              onChange={(e) => setUserName(e.target.value)}
            />
            <img
              className='icon-input'
              src='https://pharma.its-globaltek.com/wp-content/themes/pharmacy/assets/imgs/icon/ic-user.png'
              alt=''
            />
          </div>
          <div className='form-group'>
            <label htmlFor='Password'>Mật khẩu</label>
            <input
              type='text'
              className='form-control-auth'
              id='Password'
              autoComplete='on'
              onChange={(e) => setPassword(e.target.value)}
            />
            <img
              className='icon-input'
              src='https://pharma.its-globaltek.com/wp-content/themes/pharmacy/assets/imgs/icon/ic-key.png'
              alt=''
            />
          </div>

          <div className='d-flex justify-content-between remember-block'>
            <div className='checkbox-remember'>
              <input
                type='checkbox'
                id='vehicle1'
                name='vehicle1'
                value='Bike'
              />
              <label htmlFor='vehicle1'>Ghi nhớ tôi</label>
            </div>
            <Link to='true' className='text-decoration-none text-forgot'>
              Quên mật khẩu
            </Link>
          </div>
          <button type='submit' className='btn btn-primary d-block m-auto'>
            Đăng nhập
          </button>
        </form>

        <div className='d-flex justify-content-center note'>
          <Link
            to='/signup'
            onClick={(e) => {
              e.preventDefault();
              setRedirectPart(false);
            }}
          >
            Nếu chưa có tài khoản rồi thì đăng ký đi ? Ở đây này :v
          </Link>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
