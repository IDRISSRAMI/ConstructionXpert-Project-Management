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
    .min(Yup.ref('dateDebut'), 'La date de fin ne peut pas être avant la date de début'),
  projectId: Yup.string().required('Le projet est requis'),
});

const EditTask = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const taskResponse = await axios.get(`http://localhost:5000/api/tasks/${id}`);
        setTask(taskResponse.data);

        const projectsResponse = await axios.get('http://localhost:5000/api/projects/Afficher');
        setProjects(projectsResponse.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (values) => {
    try {
      const selectedProject = projects.find(project => project.nom === values.projectId);
      if (!selectedProject) {
        throw new Error('Projet non trouvé');
      }

      await axios.put(`http://localhost:5000/api/tasks/${id}`, {
        nom: values.nom,
        description: values.description,
        dateDebut: values.dateDebut,
        dateFin: values.dateFin,
        projectId: selectedProject._id,
      });
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
          nom: task.nom || '',
          description: task.description,
          dateDebut: task.dateDebut.split('T')[0],
          dateFin: task.dateFin.split('T')[0],
          projectId: projects.find(project => project._id === task.projectId)?.nom || '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="bg-white p-8 rounded-lg shadow-xl max-w-3xl mx-auto">
            <div className="mb-6">
              <label htmlFor="nom" className="block text-lg font-semibold text-teal-700">Nom de la Tâche</label>
              <Field
                type="text"
                id="nom"
                name="nom"
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
                <label htmlFor="dateDebut" className="block text-lg font-semibold text-teal-700">Date de Début</label>
                <Field
                  type="date"
                  id="dateDebut"
                  name="dateDebut"
                  className="w-full p-4 mt-2 border rounded-lg border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <ErrorMessage name="dateDebut" component="div" className="text-red-500 text-xs mt-1" />
              </div>

              <div>
                <label htmlFor="dateFin" className="block text-lg font-semibold text-teal-700">Date de Fin</label>
                <Field
                  type="date"
                  id="dateFin"
                  name="dateFin"
                  className="w-full p-4 mt-2 border rounded-lg border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <ErrorMessage name="dateFin" component="div" className="text-red-500 text-xs mt-1" />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="projectId" className="block text-lg font-semibold text-teal-700">Projet</label>
              <Field
                as="select"
                id="projectId"
                name="projectId"
                className="w-full p-4 mt-2 border rounded-lg border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="">Sélectionnez un projet</option>
                {projects.map((project) => (
                  <option key={project._id} value={project.nom}>
                    {project.nom}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="projectId" component="div" className="text-red-500 text-xs mt-1" />
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