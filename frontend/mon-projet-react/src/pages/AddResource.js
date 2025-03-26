import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const validationSchema = Yup.object({
  name: Yup.string().required('Le nom de la ressource est requis'),
  type: Yup.string().required('Le type de la ressource est requis'),
  quantity: Yup.number()
    .required('La quantité est requise')
    .positive('La quantité doit être un nombre positif')
    .integer('La quantité doit être un nombre entier'),
  supplier: Yup.string().required('Les informations du fournisseur sont requises'),
});

const AddResource = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      await axios.post('http://localhost:5000/api/resources', values);
      navigate('/resources');
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la ressource:', error);
      setStatus({
        error: error.response?.data?.message || "Une erreur s'est produite lors de l'ajout de la ressource",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-10 rounded-xl shadow-xl max-w-lg w-full border border-gray-300">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Ajouter une Ressource</h1>
        <Formik
          initialValues={{ name: '', type: '', quantity: '', supplier: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting, status }) => (
            <Form className="space-y-6">
              {status?.error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                  {status.error}
                </div>
              )}
              {['name', 'type', 'quantity', 'supplier'].map((field) => (
                <div key={field}>
                  <label htmlFor={field} className="block text-gray-700 font-medium mb-1 capitalize">
                    {field === 'quantity' ? 'Quantité' : field === 'supplier' ? 'Fournisseur' : field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <Field
                    type={field === 'quantity' ? 'number' : 'text'}
                    id={field}
                    name={field}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-gray-500 outline-none transition duration-300 ${errors[field] && touched[field] ? 'border-red-500' : 'border-gray-400'}`}
                  />
                  <ErrorMessage name={field} component="div" className="text-red-500 text-sm mt-1" />
                </div>
              ))}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gray-700 hover:bg-gray-800 text-white py-3 rounded-lg transition-all duration-300 font-semibold"
              >
                {isSubmitting ? 'Enregistrement...' : 'Enregistrer la Ressource'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddResource;
