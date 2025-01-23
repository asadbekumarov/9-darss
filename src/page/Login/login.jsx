import axios from 'axios';
import React from 'react';
import { NavLink, useNavigate, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './style.css'; 
import * as Yup from "yup";
import { Formik, Form, Field } from 'formik';
import { ErrorMessage } from 'formik';

const validationSchema = Yup.object({
  username: Yup.string()
    .min(3, "at least 3 characters")
    .required("username is required")
    .max(8, "no more than 8 characters"),
  password: Yup.string()
    .required()
    .min(6, "at least 6 characters"),
});

function Login() {
  const initialValues = {
    username: "",
    password: "",
  };
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    console.log(e);
    
    try {
      let { username, password } = e;

      let response = await axios.post('https://nt-shopping-list.onrender.com/api/auth', {
        username,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        toast.success('Signed in successfully');
        navigate('/main');
      }
    } catch (err) {
      console.log(err);
      toast.error('Login failed. Please check your credentials.');
    }
  };

  if (localStorage.getItem('token')) {
    return <Navigate to={'/main'} />;
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome Back!</h2>

        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {() => (
            <Form>
              <div className="input-group">
                <label htmlFor="username">Username</label>
                <Field type="text" name="username" className="input-field"/>
                <ErrorMessage name="username" component="div" className="error"/>
              </div>
              <div className="input-group">
                <label htmlFor="password">Password</label>
                <Field type="password" name="password" className="input-field"/>
                <ErrorMessage name="password" component="div" className="error"/>
              </div>
              <button type="submit" className="submit-btn">Submit</button>
            </Form>
          )}
        </Formik>

        <div className="login-footer">
          <p>Don't have an account?</p>
          <NavLink to={'/register'} className="login-link">Create One</NavLink>
        </div>
      </div>
    </div>
  );
}

export default Login;
