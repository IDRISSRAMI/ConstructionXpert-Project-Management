import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

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

  // Valeurs initiales simulées pour la ressource existante
  const initialValues = {
    name: 'Ressource Exemple',
    type: 'Matériau',
    quantity: 10,
    supplier: 'Fournisseur A',
  };

  const handleSubmit = (values) => {
    console.log('Ressource mise à jour :', values);
    navigate('/resources');
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-indigo-800 mb-8">Modifier la Ressource</h1>

      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ errors, touched }) => (
          <Form className="bg-white p-8 rounded-lg shadow-xl max-w-3xl mx-auto">
            <div className="mb-6">
              <label htmlFor="nom" className="block text-lg font-semibold text-indigo-700">Nom de la Ressource</label>
              <Field
                type="text"
                id="nom"
                name="nom"
                className="w-full p-4 mt-2 border rounded-lg border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <ErrorMessage name="name" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <div className="mb-6">
              <label htmlFor="type" className="block text-lg font-semibold text-indigo-700">Type</label>
              <Field
                type="text"
                id="type"
                name="type"
                className="w-full p-4 mt-2 border rounded-lg border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <ErrorMessage name="type" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <div className="mb-6">
              <label htmlFor="quantity" className="block text-lg font-semibold text-indigo-700">Quantité</label>
              <Field
                type="number"
                id="quantity"
                name="quantity"
                className="w-full p-4 mt-2 border rounded-lg border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <ErrorMessage name="quantity" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <div className="mb-6">
              <label htmlFor="supplier" className="block text-lg font-semibold text-indigo-700">Fournisseur</label>
              <Field
                type="text"
                id="supplier"
                name="supplier"
                className="w-full p-4 mt-2 border rounded-lg border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <ErrorMessage name="supplier" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-500 text-white py-3 px-6 rounded-lg w-full transition-colors duration-200 mt-6 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              Enregistrer les Modifications
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditResource;
