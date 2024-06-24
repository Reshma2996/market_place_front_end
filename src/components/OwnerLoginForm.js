import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { ownerLogin } from '../ownerSlice';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './OwnerLoginForm.css'; // Assuming you have some CSS styling for the form
import { useContext } from 'react';

const OwnerLoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setUsername, setIsAuthenticated } = useContext(AuthContext);

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      await dispatch(ownerLogin(values)); // Assuming login action returns JWT token and user data
      setUsername(values.name);
      setIsAuthenticated(true);
      setSubmitting(false);
      navigate('/owner-dashboard');
    } catch (error) {
      setSubmitting(false);
      console.error('Login failed:', error.response?.data?.message || error.message);
      // Handle login error (display error message, etc.)
    }
  };

  return (
    <div className="login-form">
      <h2>Owner Login</h2>
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={Yup.object({
          name: Yup.string().required('Name is required'),
          email: Yup.string().email('Invalid email address').required('Email is required'),
          password: Yup.string().required('Password is required'),
        })}
        onSubmit={handleLogin}
      >
        <Form>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <Field name="name" type="text" className="form-control" />
            <ErrorMessage name="name" component="div" className="text-danger" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <Field name="email" type="email" className="form-control" />
            <ErrorMessage name="email" component="div" className="text-danger" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Field name="password" type="password" className="form-control" />
            <ErrorMessage name="password" component="div" className="text-danger" />
          </div>
          <button type="submit" className="btn btn-primary" disabled={false}>
            Login
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default OwnerLoginForm;
