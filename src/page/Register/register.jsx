import axios from 'axios';
import React from 'react';
import { NavLink, useNavigate, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './style.css'; 
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { ErrorMessage } from 'formik';

const validationSchema = Yup.object({
  name: Yup.string()
    .required('fill the field')
    .min(3, 'name must be at least 3 characters')
    .max(8, 'max is 8 characters'),
  username: Yup.string()
    .min(3, 'at least 3 characters')
    .required('username is required')
    .max(8, 'no more than 8 characters'),
  password: Yup.string().required().min(6, 'at least 6 characters'),
});

function Register() {
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      let response = await axios.post(
        'https://nt-shopping-list.onrender.com/api/users',
        {
          name: values.name,
          username: values.username,
          password: values.password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 201) {
        localStorage.setItem('token', response.data.token);
        toast.success('Signed up successfully');
        navigate('/main');
      }
    } catch (err) {
      console.log(err.response?.data || err.message);
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };

  if (localStorage.getItem('token')) {
    return <Navigate to={'/main'} />;
  }

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Create an Account</h2>
        <Formik
          initialValues={{
            name: '',
            username: '',
            password: '',
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {() => (
            <Form>
              <div className="input-group">
                <label htmlFor="name">Enter your name</label>
                <Field id="name" type="text" name="name" className="input-field"/>
                <ErrorMessage name="name" component="div" className="error"/>
              </div>
              <div className="input-group">
                <label htmlFor="username">Enter your Username</label>
                <Field id="username" type="text" name="username" className="input-field"/>
                <ErrorMessage name="username" component="div" className="error"/>
              </div>
              <div className="input-group">
                <label htmlFor="password">Enter your Password</label>
                <Field id="password" type="password" name="password" className="input-field"/>
                <ErrorMessage name="password" component="div" className="error"/>
              </div>
              <button type="submit" className="submit-btn">Sign Up</button>
            </Form>
          )}
        </Formik>
        <div className="register-footer">
          <p>Already have an account?</p>
          <NavLink to={'/login'} className="register-link">Log In</NavLink>
        </div>
      </div>
    </div>
  );
}

export default Register;
