import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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

const EditTask = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/tasks/${id}`);
        setTask(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération de la tâche:', error);
      }
    };
    fetchTask();
  }, [id]);

  const handleSubmit = async (values) => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${id}`, values);
      navigate('/tasks');
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la tâche:', error);
    }
  };

  if (!task) {
    return <div className="text-white text-center">Chargement...</div>;
  }

  return (
    <div className="container mx-auto p-8 bg-gradient-to-r from-green-900 to-teal-900 min-h-screen">
      <h1 className="text-4xl font-bold text-white mb-8">Modifier une Tâche</h1>

      <Formik
        initialValues={{
          name: task.name,
          description: task.description,
          startDate: task.startDate,
          endDate: task.endDate,
          resources: task.resources,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="bg-white p-8 rounded-lg shadow-xl max-w-3xl mx-auto">
            <div className="mb-6">
              <label htmlFor="name" className="block text-lg font-semibold text-teal-700">Nom de la Tâche</label>
              <Field
                type="text"
                id="name"
                name="name"
                className="w-full p-4 mt-2 border rounded-lg border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <ErrorMessage name="nom" component="div" className="text-red-500 text-xs mt-1" />
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
                <label htmlFor="DateDebut" className="block text-lg font-semibold text-teal-700">Date de Début</label>
                <Field
                  type="date"
                  id="DateDebut"
                  name="DateDebut"
                  className="w-full p-4 mt-2 border rounded-lg border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <ErrorMessage name="DebutDate" component="div" className="text-red-500 text-xs mt-1" />
              </div>

              <div>
                <label htmlFor="FinDate" className="block text-lg font-semibold text-teal-700">Date de Fin</label>
                <Field
                  type="date"
                  id="FinDate"
                  name="FinDate"
                  className="w-full p-4 mt-2 border rounded-lg border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <ErrorMessage name="FinDate" component="div" className="text-red-500 text-xs mt-1" />
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
              Enregistrer les Modifications
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditTask;