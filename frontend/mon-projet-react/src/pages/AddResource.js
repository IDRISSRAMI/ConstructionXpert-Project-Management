import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string().required('Le nom de la ressource est requis'),
  type: Yup.string().required('Le type de la ressource est requis'),
  quantity: Yup.number().required('La quantité est requise').positive('La quantité doit être un nombre positif'),
  supplier: Yup.string().required('Les informations du fournisseur sont requises'),
});

const AddResource = () => {
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    console.log(values);
    navigate('/resources');
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-teal-700 mb-6">Ajouter une Ressource</h1>
      <Formik
        initialValues={{
          nom: '',
          description: '',
          DateDebut: '',
          DateFin: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="bg-white p-8 rounded-xl shadow-lg">
            <div className="mb-6">
              <label htmlFor="name" className="block text-sm font-semibold text-teal-700">Nom de la ressource</label>
              <Field type="text" id="name" name="name" className="w-full p-4 mt-2 border rounded-lg border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-300" />
              <ErrorMessage name="name" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <div className="mb-6">
              <label htmlFor="type" className="block text-sm font-semibold text-teal-700">Type</label>
              <Field type="text" id="type" name="type" className="w-full p-4 mt-2 border rounded-lg border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-300" />
              <ErrorMessage name="type" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <div className="mb-6">
              <label htmlFor="quantity" className="block text-sm font-semibold text-teal-700">Quantité</label>
              <Field type="number" id="quantity" name="quantity" className="w-full p-4 mt-2 border rounded-lg border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-300" />
              <ErrorMessage name="quantity" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <div className="mb-6">
              <label htmlFor="supplier" className="block text-sm font-semibold text-teal-700">Fournisseur</label>
              <Field type="text" id="supplier" name="supplier" className="w-full p-4 mt-2 border rounded-lg border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-300" />
              <ErrorMessage name="supplier" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <button type="submit" className="bg-teal-600 hover:bg-teal-500 text-white py-3 px-6 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-teal-300">
              Enregistrer la Ressource
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddResource;
