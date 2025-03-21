import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

// Validation schema
const validationSchema = Yup.object({
  nom: Yup.string().required('Project name is required'),
  description: Yup.string().required('Description is required'),
  dateDebut: Yup.date().required('Start date is required'),
  dateFin: Yup.date()
    .required('End date is required')
    .min(Yup.ref('dateDebut'), 'End date cannot be before start date'),
    budget: Yup.number().required('Budget is required').positive('Budget must be a positive number'),
});

const AddProject = () => {
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (values) => {
    try {
      await axios.post('http://localhost:5000/api/projects', values);
      navigate('/');
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  return (
    <div className="container mx-auto p-8 bg-gradient-to-r from-green-900 to-teal-900 min-h-screen">
      <h1 className="text-4xl font-bold text-white mb-8">Add New Project</h1>

      <Formik
        initialValues={{
          nom: '',
          description: '',
          dateDebut: '',
          dateFin: '',
          budget: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="bg-white p-8 rounded-lg shadow-xl max-w-3xl mx-auto">
            {/* Project Name */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-semibold">Project Name</label>
              <Field
                type="text"
                id="nom"
                name="nom"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              <ErrorMessage
                name="nom"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Description */}
            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700 font-semibold">Description</label>
              <Field
                type="text"
                id="description"
                name="description"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Start Date */}
            <div className="mb-4">
              <label htmlFor="dateDebut" className="block text-gray-700 font-semibold">Start Date</label>
              <Field
                type="date"
                id="dateDebut"
                name="dateDebut"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              <ErrorMessage
                name="dateDebut"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* End Date */}
            <div className="mb-4">
              <label htmlFor="dateFin" className="block text-gray-700 font-semibold">End Date</label>
              <Field
                type="date"
                id="dateFin"
                name="dateFin"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              <ErrorMessage
                name="dateFin"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Budget */}
            <div className="mb-4">
              <label htmlFor="budget" className="block text-gray-700 font-semibold">Budget</label>
              <Field
                type="number"
                id="budget"
                name="budget"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              <ErrorMessage
                name="budget"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-teal-600 hover:bg-teal-500 text-white py-3 px-6 rounded-lg w-full"
            >
              Save Project
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddProject;
