import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';

import './register.scss';
const Register = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      password: '',
      confirmedPassword: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Required')
        .min(4, 'Must be 4 characters or more'),
      email: Yup.string()
        .required('Required')
        .matches(
          /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
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
    }),
    onSubmit: (values) => {
      // console.log(values);
      register(values);
    },
  });

  // Register Func
  const register = async (values) => {
    const newValue = {
      username: values.name,
      password: values.password,
    };
    try {
      const res = await axios.post(
        'http://localhost:5000/api/v1/auth/register',
        newValue
      );
      localStorage.setItem(
        'login',
        JSON.stringify({
          accessToken: res.data.accessToken,
        })
      );
      navigate('/');
      toast.success('Đăng ký thành công !');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section>
      <form
        className='infoform'
        id='register-form'
        onSubmit={formik.handleSubmit}
      >
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
        <label> Confirm Password </label>
        <input
          type='text'
          id='confirmedPassword'
          name='confirmedPassword'
          value={formik.values.confirmedPassword}
          onChange={formik.handleChange}
          placeholder='Confirm your password'
        />
        {formik.errors.confirmedPassword && (
          <p className='errorMsg'> {formik.errors.confirmedPassword} </p>
        )}

        {/* <input
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
        <label>I have read and agree to the Terms</label>
        {formik.errors.acceptTerms && (
          <p className='errorMsg'> {formik.errors.acceptTerms} </p>
        )} */}

        <button type='submit'> Continue </button>
      </form>
    </section>
  );
};

export default Register;
