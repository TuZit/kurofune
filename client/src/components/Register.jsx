import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './LoginPage.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  let navigate = useNavigate();
  const [error, setError] = useState();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmedPassword: '',
      acceptTerms: false,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Required')
        .min(4, 'Must be 4 characters or more'),
      email: Yup.string()
        .required('Required')
        .matches(
          /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
          'Please enter a valid email address'
        ),
      password: Yup.string()
        .required('Required')
        .matches(
          /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/,
          'Password must be 7-19 characters and contain at least one letter, one number and a special character'
        ),
      confirmedPassword: Yup.string()
        .required('Required')
        .oneOf([Yup.ref('password'), null], 'Password must match'),
      acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required'),
    }),
    onSubmit: (values) => {
      // console.log(values);
      // createUser(values);
      register(values);
      console.log('dcm');
      navigate('/');
    },
  });

  const register = async (values) => {
    try {
      const res = await axios.post(
        'http://localhost:5000/v1/auth/register',
        values
      );
      localStorage.setItem(
        'login',
        JSON.stringify({
          userLogin: true,
          accessToken: res.data.accessToken,
        })
      );
      setError('');
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className='loginPage__banner'>
        <div className='blur-overlay'></div>
        <h3>Sign Up To Order</h3>
      </div>

      <div className='loginPage__container--signup'>
        <h3>Sign Up</h3>
        <p className='login-msg'>{error}</p>
        <form className='infoform' onSubmit={formik.handleSubmit}>
          {/* <div className="loginPage__formItems"> */}
          <label> Your name </label>
          <input
            type='text'
            id='name'
            name='name'
            value={formik.values.name}
            onChange={formik.handleChange}
            placeholder='Enter your name'
          />
          {formik.errors.name && (
            <p className='errorMsg'> {formik.errors.name} </p>
          )}
          {/* </div> */}

          {/* <div className="loginPage__formItems"> */}
          <label> Email address </label>
          <input
            type='email'
            id='email'
            name='email'
            value={formik.values.email}
            onChange={formik.handleChange}
            placeholder='Enter your email'
          />
          {formik.errors.email && (
            <p className='errorMsg'> {formik.errors.email} </p>
          )}
          {/* </div> */}

          {/* <div className="loginPage__formItems"> */}
          <label> Password </label>
          <input
            type='text'
            id='password'
            name='password'
            value={formik.values.password}
            onChange={formik.handleChange}
            placeholder='Enter your password'
          />
          {formik.errors.password && (
            <p className='errorMsg'> {formik.errors.password} </p>
          )}
          {/* </div> */}

          {/* <label> Confirm Password </label>
          <input
            type="text"
            id="confirmedPassword"
            name="confirmedPassword"
            value={formik.values.confirmedPassword}
            onChange={formik.handleChange}
            placeholder="Confirm your password"
          />
          {formik.errors.confirmedPassword && (
            <p className="errorMsg"> {formik.errors.confirmedPassword} </p>
          )} */}

          {/* <div className="loginPage__formItems"> */}
          <input
            name='acceptTerms'
            type='checkbox'
            className='form-check-input'
            onChange={formik.handleChange}
            value={formik.values.acceptTerms}
            style={{
              display: 'inline-block',
              width: 'auto',
              textAlign: 'left',
              marginRight: '6px',
            }}
          />
          <label
            htmlFor='acceptTerms'
            style={{
              display: 'inline-block',
              width: 'auto',
            }}
          >
            I have read and agree to the Terms
          </label>
          {formik.errors.acceptTerms && (
            <p className='errorMsg'> {formik.errors.acceptTerms} </p>
          )}
          {/* </div> */}

          <button
            className='btn'
            style={{ display: 'block', marginTop: '10px' }}
            type='submit'
            onClick={register}
          >
            CREATE
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
