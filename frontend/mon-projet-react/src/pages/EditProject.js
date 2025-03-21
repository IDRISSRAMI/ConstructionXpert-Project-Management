import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string().required('Le nom du projet est requis'),
  description: Yup.string().required('La description est requise'),
  startDate: Yup.date().required('La date de début est requise'),
  endDate: Yup.date()
    .required('La date de fin est requise')
    .min(Yup.ref('startDate'), 'La date de fin ne peut pas être avant la date de début'),
  budget: Yup.number().required('Le budget est requis').positive('Le budget doit être un nombre positif'),
});

const EditProject = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Initial values for the form, simulating the data being loaded for the project
  const initialValues = {
    nom: 'Projet Existants',
    description: 'Ceci est une description exemple.',
    dateDebut: '2025-03-01',
    dateFin: '2025-03-30',
    budget: 50000,
  };

  const handleSubmit = (values) => {
    console.log('Projet mis à jour:', values);
    navigate('/projects');
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-indigo-800 mb-8">Modifier le Projet</h1>

      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ errors, touched }) => (
          <Form className="bg-white p-8 rounded-lg shadow-xl max-w-3xl mx-auto">
            <div className="mb-6">
              <label htmlFor="name" className="block text-lg font-semibold text-indigo-700">Nom du Projet</label>
              <Field
                type="text"
                id="name"
                name="name"
                className="w-full p-4 mt-2 border rounded-lg border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <ErrorMessage name="nom" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <div className="mb-6">
              <label htmlFor="description" className="block text-lg font-semibold text-indigo-700">Description</label>
              <Field
                as="textarea"
                id="description"
                name="description"
                className="w-full p-4 mt-2 border rounded-lg border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows="4"
              />
              <ErrorMessage name="description" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <div className="mb-6 grid grid-cols-2 gap-6">
              <div>
                <label htmlFor="DateDebut" className="block text-lg font-semibold text-indigo-700">Date de Début</label>
                <Field
                  type="date"
                  id="DateDebut"
                  name="DateDebut"
                  className="w-full p-4 mt-2 border rounded-lg border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <ErrorMessage name="DateFin" component="div" className="text-red-500 text-xs mt-1" />
              </div>

              <div>
                <label htmlFor="FinDate" className="block text-lg font-semibold text-indigo-700">Date de Fin</label>
                <Field
                  type="date"
                  id="FinDate"
                  name="FinDate"
                  className="w-full p-4 mt-2 border rounded-lg border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <ErrorMessage name="FinDate" component="div" className="text-red-500 text-xs mt-1" />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="budget" className="block text-lg font-semibold text-indigo-700">Budget</label>
              <Field
                type="number"
                id="budget"
                name="budget"
                className="w-full p-4 mt-2 border rounded-lg border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <ErrorMessage name="budget" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-500 text-white py-3 px-6 rounded-lg w-full transition-colors duration-200 mt-6 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              Sauvegarder les Modifications
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditProject;
