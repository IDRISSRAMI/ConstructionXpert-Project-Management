import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const validationSchema = Yup.object({
  nom: Yup.string().required('Le nom de la tâche est requis'),
  description: Yup.string().required('La description est requise'),
  dateDebut: Yup.date().required('La date de début est requise'),
  dateFin: Yup.date()
    .required('La date de fin est requise')
    .min(Yup.ref('dateDebut'), 'La date de fin doit suivre la date de début'),
  projectId: Yup.string().required('Le projet est requis'),
});

const AddTask = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/projects/Afficher');
        setProjects(response.data);

        if (projectId) {
          const project = response.data.find(p => p._id === projectId);
          if (project) {
            setSelectedProject(project.nom);
          }
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des projets:', error);
      }
    };
    fetchProjects();
  }, [projectId]);

  const handleSubmit = async (values) => {
    try {
      const selectedProject = projects.find(project => project.nom === values.projectId);
      if (!selectedProject) {
        throw new Error('Projet non trouvé');
      }

      const taskData = {
        nom: values.nom,
        description: values.description,
        dateDebut: values.dateDebut,
        dateFin: values.dateFin,
        projectId: selectedProject._id,
      };

      await axios.post('http://localhost:5000/api/tasks', taskData);
      navigate('/tasks');
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la tâche:', error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-10 rounded-xl shadow-xl max-w-lg w-full border border-gray-300">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Ajouter une Tâche</h1>
        <Formik
          initialValues={{
            nom: '',
            description: '',
            dateDebut: '',
            dateFin: '',
            projectId: selectedProject,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, setFieldValue }) => (
            <Form className="space-y-6">
              <div>
                <label htmlFor="nom" className="block text-gray-700 font-medium mb-1">Nom de la Tâche</label>
                <Field
                  type="text"
                  id="nom"
                  name="nom"
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-gray-500 outline-none transition duration-300 ${errors.nom && touched.nom ? 'border-red-500' : 'border-gray-400'}`}
                />
                <ErrorMessage name="nom" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label htmlFor="description" className="block text-gray-700 font-medium mb-1">Description</label>
                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-gray-500 outline-none transition duration-300"
                  rows="4"
                />
                <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label htmlFor="dateDebut" className="block text-gray-700 font-medium mb-1">Date de Début</label>
                  <Field
                    type="date"
                    id="dateDebut"
                    name="dateDebut"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-gray-500 outline-none transition duration-300"
                  />
                  <ErrorMessage name="dateDebut" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <label htmlFor="dateFin" className="block text-gray-700 font-medium mb-1">Date de Fin</label>
                  <Field
                    type="date"
                    id="dateFin"
                    name="dateFin"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-gray-500 outline-none transition duration-300"
                  />
                  <ErrorMessage name="dateFin" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </div>

              <div>
                <label htmlFor="projectId" className="block text-gray-700 font-medium mb-1">Projet</label>
                <Field
                  as="select"
                  id="projectId"
                  name="projectId"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-gray-500 outline-none transition duration-300"
                  value={selectedProject}
                  onChange={(e) => {
                    setSelectedProject(e.target.value);
                    setFieldValue('projectId', e.target.value);
                  }}
                >
                  <option value="">Sélectionnez un projet</option>
                  {projects.map((project) => (
                    <option key={project._id} value={project.nom}>{project.nom}</option>
                  ))}
                </Field>
                <ErrorMessage name="projectId" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <button
                type="submit"
                className="w-full bg-gray-700 hover:bg-gray-800 text-white py-3 rounded-lg transition-all duration-300 font-semibold"
              >
                Enregistrer la Tâche
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddTask;
