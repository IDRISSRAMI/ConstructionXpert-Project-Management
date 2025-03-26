import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const validationSchema = Yup.object({
  nom: Yup.string().required('Le nom est requis'),
  description: Yup.string().required('La description est requise'),
  dateDebut: Yup.date().required('La date de début est requise'),
  dateFin: Yup.date()
    .required('La date de fin est requise')
    .min(Yup.ref('dateDebut'), 'La date de fin ne peut pas être avant la date de début'),
  budget: Yup.number()
    .required('Le budget est requis')
    .positive('Le budget doit être positif'),
});

const EditProject = () => {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const [initialValues, setInitialValues] = useState({
    nom: '',
    description: '',
    dateDebut: '',
    dateFin: '',
    budget: '',
  });
  const [loading, setLoading] = useState(true); 

  
  useEffect(() => {
    if (id) {
      const fetchProject = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/projects/${id}`);
          const project = response.data;
          setInitialValues({
            nom: project.nom,
            description: project.description,
            dateDebut: project.dateDebut,
            dateFin: project.dateFin,
            budget: project.budget,
          });
        } catch (error) {
          console.error('Erreur lors du chargement du projet:', error);
        } finally {
          setLoading(false); 
        }
      };
      fetchProject();
    } else {
      setLoading(false); 
    }
  }, [id]);

  const handleSubmit = async (values) => {
    try {
      if (id) {
        
        await axios.put(`http://localhost:5000/api/projects/Modifier/${id}`, values);
      } else {
        
        await axios.post('http://localhost:5000/api/projects', values);
      }
      navigate('/');
    } catch (error) {
      console.error('Erreur lors de l\'ajout ou de la modification du projet:', error);
    }
  };

  if (loading) {
    return <div>Chargement en cours...</div>; 
  }

  return (
    <div className="container mx-auto p-8 bg-cover bg-center min-h-screen" >
      <h1 className="text-4xl font-bold text-white mb-8 text-center">{id ? 'Modifier un Projet' : 'Ajouter un Projet'}</h1>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize 
      >
        {({ errors, touched }) => (
          <Form className="bg-white p-8 rounded-lg shadow-lg max-w-3xl mx-auto">
            
            <div className="mb-6">
              <label htmlFor="nom" className="block text-lg font-semibold text-gray-800">Nom</label>
              <Field
                type="text"
                id="nom"
                name="nom"
                className="w-full p-4 mt-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
              <ErrorMessage name="nom" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            
            <div className="mb-6">
              <label htmlFor="description" className="block text-lg font-semibold text-gray-800">Description</label>
              <Field
                as="textarea"
                id="description"
                name="description"
                className="w-full p-4 mt-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                rows="4"
              />
              <ErrorMessage name="description" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            
            <div className="mb-6 grid grid-cols-2 gap-6">
              <div>
                <label htmlFor="dateDebut" className="block text-lg font-semibold text-gray-800">Date de Début</label>
                <Field
                  type="date"
                  id="dateDebut"
                  name="dateDebut"
                  className="w-full p-4 mt-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
                <ErrorMessage name="dateDebut" component="div" className="text-red-500 text-xs mt-1" />
              </div>

              <div>
                <label htmlFor="dateFin" className="block text-lg font-semibold text-gray-800">Date de Fin</label>
                <Field
                  type="date"
                  id="dateFin"
                  name="dateFin"
                  className="w-full p-4 mt-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
                <ErrorMessage name="dateFin" component="div" className="text-red-500 text-xs mt-1" />
              </div>
            </div>

            
            <div className="mb-6">
              <label htmlFor="budget" className="block text-lg font-semibold text-gray-800">Budget</label>
              <Field
                type="number"
                id="budget"
                name="budget"
                className="w-full p-4 mt-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
              <ErrorMessage name="budget" component="div" className="text-red-500 text-xs mt-1" />
            </div>

           
            <button
              type="submit"
              className="bg-gray-800 hover:bg-gray-700 text-white py-3 px-6 rounded-lg w-full transition-colors duration-200 mt-6 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              {id ? 'Modifier le Projet' : 'Enregistrer le Projet'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditProject;