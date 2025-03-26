import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const validationSchema = Yup.object({
  nom: Yup.string().required('Le nom du projet est obligatoire'),
  description: Yup.string().required('La description est obligatoire'),
  dateDebut: Yup.date().required('La date de début est obligatoire'),
  dateFin: Yup.date()
    .required('La date de fin est obligatoire')
    .min(Yup.ref('dateDebut'), 'La date de fin ne peut pas être avant la date de début'),
  budget: Yup.number().required('Le budget est obligatoire').positive('Le budget doit être un nombre positif'),
});

const AddProject = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [projectData, setProjectData] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchProjectData = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/projects/${id}`);
          setProjectData(response.data.projet);
        } catch (error) {
          console.error('Erreur lors de la récupération des données du projet:', error);
        }
      };
      fetchProjectData();
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
      console.error('Erreur lors de la soumission du projet:', error);
    }
  };

  if (id && !projectData) {
    return <div className="text-center text-gray-600">Chargement...</div>;
  }

  const initialValues = {
    nom: projectData ? projectData.nom : '',
    description: projectData ? projectData.description : '',
    dateDebut: projectData ? projectData.dateDebut : '',
    dateFin: projectData ? projectData.dateFin : '',
    budget: projectData ? projectData.budget : '',
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-10 rounded-xl shadow-xl max-w-lg w-full border border-gray-300">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {id ? 'Modifier le projet' : 'Ajouter un nouveau projet'}
        </h1>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {() => (
            <Form className="space-y-6">
              {['nom', 'description', 'dateDebut', 'dateFin', 'budget'].map((field) => (
                <div key={field}>
                  <label htmlFor={field} className="block text-gray-700 font-medium mb-1 capitalize">
                    {field.replace(/([A-Z])/g, ' $1')}
                  </label>
                  <Field
                    type={field.includes('date') ? 'date' : field === 'budget' ? 'number' : 'text'}
                    id={field}
                    name={field}
                    className="w-full p-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-gray-500 outline-none transition duration-300"
                  />
                  <ErrorMessage name={field} component="div" className="text-red-500 text-sm mt-1" />
                </div>
              ))}
              <button
                type="submit"
                className="w-full bg-gray-700 hover:bg-gray-800 text-white py-3 rounded-lg transition-all duration-300 font-semibold"
              >
                {id ? 'Enregistrer les modifications' : 'Enregistrer le projet'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddProject;
// const [text, set text] = useState("");
//<input 
//type="text" 
//placeholder="Entrez quelque chose..." 
//className="border rounded-lg p-2 w-full"
///>

