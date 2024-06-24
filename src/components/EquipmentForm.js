import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { createEquipment, updateEquipment } from '../api';
import { useNavigate, useParams } from 'react-router-dom';

const EquipmentForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const initialValues = {
    name: '',
    description: '',
    specifications: '',
    rentalRate: '',
    availabilityStartDate: '',
    availabilityEndDate: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    specifications: Yup.string().required('Required'),
    rentalRate: Yup.number().required('Required'),
    availabilityStartDate: Yup.date().required('Required'),
    availabilityEndDate: Yup.date().required('Required'),
  });

  const onSubmit = async (values) => {
    try {
      if (isEditing
	  ) {
        await updateEquipment(id, values);
      } else {
        await createEquipment(values);
      }
      navigate('/');
    } catch (error) {
      console.error('Failed to save equipment', error);
    }
  };

  return (
    <div>
      <h1>{isEditing ? 'Edit Equipment' : 'Add Equipment'}</h1>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form>
          <div>
            <label htmlFor="name">Name</label>
            <Field name="name" type="text" />
            <ErrorMessage name="name" component="div" />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <Field name="description" as="textarea" />
            <ErrorMessage name="description" component="div" />
          </div>
          <div>
            <label htmlFor="specifications">Specifications</label>
            <Field name="specifications" as="textarea" />
            <ErrorMessage name="specifications" component="div" />
          </div>
          <div>
            <label htmlFor="rentalRate">Rental Rate</label>
            <Field name="rentalRate" type="number" />
            <ErrorMessage name="rentalRate" component="div" />
          </div>
          <div>
            <label htmlFor="availabilityStartDate">Availability Start Date</label>
            <Field name="availabilityStartDate" type="date" />
            <ErrorMessage name="availabilityStartDate" component="div" />
          </div>
          <div>
            <label htmlFor="availabilityEndDate">Availability End Date</label>
            <Field name="availabilityEndDate" type="date" />
            <ErrorMessage name="availabilityEndDate" component="div" />
          </div>
          <button type="submit">{isEditing ? 'Update' : 'Add'} Equipment</button>
        </Form>
      </Formik>
    </div>
  );
};

export default EquipmentForm;