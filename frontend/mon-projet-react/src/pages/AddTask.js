import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const validationSchema = Yup.object({
  name: Yup.string().required('Le nom de la tâche est requis'),
  description: Yup.string().required('La description est requise'),
  startDate: Yup.date().required('La date de début est requise'),
  endDate: Yup.date()
    .required('La date de fin est requise')
    .min(Yup.ref('startDate'), 'La date de fin ne peut pas être avant la date de début'),
  resources: Yup.string().required('Les ressources sont requises'),
});

const AddTask = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      await axios.post('http://localhost:5000/api/tasks', values);
      navigate('/tasks');
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la tâche:', error);
    }
  };

  return (
    <div className="container mx-auto p-8 bg-gradient-to-r from-green-900 to-teal-900 min-h-screen">
      <h1 className="text-4xl font-bold text-white mb-8">Ajouter une Tâche</h1>

      <Formik
        initialValues={{
          nom:'',
          description: '',
          startDate: '',
          dateFin: '',
          resources: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="bg-white p-8 rounded-lg shadow-xl max-w-3xl mx-auto">
            <div className="mb-6">
              <label htmlFor="nome" className="block text-lg font-semibold text-teal-700">Nom de la Tâche</label>
              <Field
                type="text"
                id="name"
                name="name"
                className="w-full p-4 mt-2 border rounded-lg border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <ErrorMessage name="name" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <div className="mb-6">
              <label htmlFor="description" className="block text-lg font-semibold text-teal-700">Description</label>
              <Field
                as="textarea"
                id="description"
                name="description"
                className="w-full p-4 mt-2 border rounded-lg border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                rows="4"
              />
              <ErrorMessage name="description" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <div className="mb-6 grid grid-cols-2 gap-6">
              <div>
                <label htmlFor="startDate" className="block text-lg font-semibold text-teal-700">Date de Début</label>
                <Field
                  type="date"
                  id="startDate"
                  name="startDate"
                  className="w-full p-4 mt-2 border rounded-lg border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <ErrorMessage name="startDate" component="div" className="text-red-500 text-xs mt-1" />
              </div>

              <div>
                <label htmlFor="endDate" className="block text-lg font-semibold text-teal-700">Date de Fin</label>
                <Field
                  type="date"
                  id="endDate"
                  name="endDate"
                  className="w-full p-4 mt-2 border rounded-lg border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <ErrorMessage name="endDate" component="div" className="text-red-500 text-xs mt-1" />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="resources" className="block text-lg font-semibold text-teal-700">Ressources</label>
              <Field
                type="text"
                id="resources"
                name="resources"
                className="w-full p-4 mt-2 border rounded-lg border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <ErrorMessage name="resources" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <button
              type="submit"
              className="bg-teal-600 hover:bg-teal-500 text-white py-3 px-6 rounded-lg w-full transition-colors duration-200 mt-6 focus:outline-none focus:ring-2 focus:ring-teal-300"
            >
              Enregistrer la Tâche
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddTask;