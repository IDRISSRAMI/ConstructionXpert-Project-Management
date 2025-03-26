import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const validationSchema = Yup.object({
  name: Yup.string().required('Le nom de la ressource est requis'),
  type: Yup.string().required('Le type de la ressource est requis'),
  quantity: Yup.number()
    .required('La quantité est requise')
    .positive('La quantité doit être un nombre positif'),
  supplier: Yup.string().required('Les informations du fournisseur sont requises'),
});

const EditResource = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResource = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/resources/${id}`);
        setResource(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération de la ressource:', error);
        setError('Impossible de charger la ressource. Veuillez réessayer plus tard.');
        setLoading(false);
      }
    };

    fetchResource();
  }, [id]);

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      await axios.put(`http://localhost:5000/api/resources/${id}`, values);
      navigate('/resources');
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la ressource:', error);
      setStatus({
        error: error.response?.data?.message || 'Une erreur s\'est produite lors de la mise à jour de la ressource'
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="container mx-auto p-8 text-center">Chargement de la ressource...</div>;
  if (error) return <div className="container mx-auto p-8 text-center text-red-600">{error}</div>;
  if (!resource) return <div className="container mx-auto p-8 text-center">Ressource non trouvée</div>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-teal-700 mb-8">Modifier la Ressource</h1>

      <Formik
        initialValues={{
          name: resource.name || '',
          type: resource.type || '',
          quantity: resource.quantity || '',
          supplier: resource.supplier || '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting, status }) => (
          <Form className="bg-white p-8 rounded-lg shadow-xl max-w-3xl mx-auto">
            {status && status.error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                {status.error}
              </div>
            )}
            
            <div className="mb-6">
              <label htmlFor="name" className="block text-lg font-semibold text-teal-700">Nom de la Ressource</label>
              <Field
                type="text"
                id="name"
                name="name"
                className="w-full p-4 mt-2 border rounded-lg border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <ErrorMessage name="name" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <div className="mb-6">
              <label htmlFor="type" className="block text-lg font-semibold text-teal-700">Type</label>
              <Field
                type="text"
                id="type"
                name="type"
                className="w-full p-4 mt-2 border rounded-lg border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <ErrorMessage name="type" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <div className="mb-6">
              <label htmlFor="quantity" className="block text-lg font-semibold text-teal-700">Quantité</label>
              <Field
                type="number"
                id="quantity"
                name="quantity"
                className="w-full p-4 mt-2 border rounded-lg border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <ErrorMessage name="quantity" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <div className="mb-6">
              <label htmlFor="supplier" className="block text-lg font-semibold text-teal-700">Fournisseur</label>
              <Field
                type="text"
                id="supplier"
                name="supplier"
                className="w-full p-4 mt-2 border rounded-lg border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <ErrorMessage name="supplier" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <div className="flex justify-end mt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-teal-700 text-white px-6 py-3 rounded-lg hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                {isSubmitting ? 'Enregistrement en cours...' : 'Enregistrer les modifications'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditResource;