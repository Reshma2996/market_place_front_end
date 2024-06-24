// src/components/OwnerRegisterForm.js
import React, {useState}from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ownerregisterUser } from '../api';
import { useNavigate } from 'react-router-dom';
import './OwnerRegisterForm.css';

const OwnerRegisterForm = () => {
    const navigate = useNavigate();
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
  
    return (
      <div className="owner-register-form">
        <h2>Owner Registration</h2>
        <Formik
          initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
          validationSchema={Yup.object({
            name: Yup.string().required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().required('Required'),
            confirmPassword: Yup.string()
              .oneOf([Yup.ref('password'), null], 'Passwords must match')
              .required('Required'),
          })}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              const response = await ownerregisterUser(values);
              console.log('Registration successful:', response.data);
              setShowSuccessMessage(true);
              setErrorMessage('');
              resetForm(); // Reset form fields after successful registration
              setTimeout(() => {
                navigate('/owner-login');
            }, 500);
            } catch (error) {
              console.error('Registration failed:', error.response?.data?.message || error.message);
              setErrorMessage(error.response?.data?.message || 'Something went wrong during registration.');
            } finally {
              setSubmitting(false);
            }
          }}
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
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <Field name="confirmPassword" type="password" className="form-control" />
              <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
            </div>
            <button type="submit" className="btn btn-primary">Register</button>
          </Form>
        </Formik>
  
        {showSuccessMessage && (
          <div className="success-message">
            <p>Registered successfully!</p>
            {/* You can add a close button or set a timeout to hide the message */}
          </div>
        )}
  
        {errorMessage && (
          <div className="error-message">
            <p>{errorMessage}</p>
          </div>
        )}
      </div>
    );
  };
  
export default OwnerRegisterForm;
