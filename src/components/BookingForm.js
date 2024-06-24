import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { createBooking } from '../api';
import { useNavigate, useParams } from 'react-router-dom';

const BookingForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Equipment ID

  const initialValues = {
    rentalStartDate: '',
    rentalEndDate: '',
    userContact: '',
    paymentMethod: 'razorpay', // Default payment method
    rentalRate: 100, // Example rental rate, you may want to get this dynamically
  };

  const validationSchema = Yup.object({
    rentalStartDate: Yup.date().required('Required'),
    rentalEndDate: Yup.date().required('Required'),
    userContact: Yup.string().required('Required'),
  });

  const handlePayment = (amount) => {
    const options = {
      key: 'RAZORPAY_KEY_ID', // Enter the Key ID generated from the Dashboard
      amount: amount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 100 is equal to 1 INR.
      currency: 'INR',
      name: 'Equipment Rental',
      description: 'Rental Payment',
      handler: function (response) {
        alert('Payment Successful');
        console.log(response);
      },
      prefill: {
        name: 'User Name',
        email: 'user@example.com',
        contact: '9999999999',
      },
      notes: {
        address: 'Rental Service Corporate Office',
      },
      theme: {
        color: '#F37254',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const onSubmit = async (values) => {
    try {
      await createBooking({ ...values, equipmentId: id });
      handlePayment(values.rentalRate);
      navigate('/bookings');
    } catch (error) {
      console.error('Failed to create booking', error);
    }
  };

  return (
    <div>
      <h1>Book Equipment</h1>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form>
          <div>
            <label htmlFor="rentalStartDate">Rental Start Date</label>
            <Field name="rentalStartDate" type="date" />
            <ErrorMessage name="rentalStartDate" component="div" />
          </div>
          <div>
            <label htmlFor="rentalEndDate">Rental End Date</label>
            <Field name="rentalEndDate" type="date" />
            <ErrorMessage name="rentalEndDate" component="div" />
          </div>
          <div>
            <label htmlFor="userContact">Your Contact Information</label>
            <Field name="userContact" type="text" />
            <ErrorMessage name="userContact" component="div" />
          </div>
          <button type="submit">Book Now</button>
        </Form>
      </Formik>
    </div>
  );
};

export default BookingForm;
