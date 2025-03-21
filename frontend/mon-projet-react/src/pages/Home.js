import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Banknote, Edit, Eye, Trash2, Plus } from 'lucide-react';
import axios from 'axios';

const Home = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/projects/Afficher');
      console.log('Réponse de l\'API:', response.data); // Log de la réponse
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const deleteProject = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/projects/Supprimer/${id}`);
      fetchProjects(); // Rafraîchir la liste après la suppression
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gradient-to-r from-green-900 to-teal-900 min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">Project Management</h1>
        <Link
          to="/projects/add"
          className="bg-teal-600 hover:bg-teal-500 text-white py-2 px-4 rounded-lg transition-colors duration-200 fixed bottom-6 right-6 flex items-center gap-2"
        >
          <Plus size={18} />
          New Project
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project._id}
            className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-teal-500"
          >
            <h2 className="text-xl font-semibold text-teal-900">{project.nom}</h2>
            <p className="text-gray-700 mt-2">{project.description}</p>

            <div className="my-4 space-y-2">
              <div className="flex items-center text-gray-600">
                <Calendar size={16} className="mr-2 text-teal-500" />
                <span>Start: {new Date(project.dateDebut).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar size={16} className="mr-2 text-teal-500" />
                <span>End: {new Date(project.dateFin).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Banknote size={16} className="mr-2 text-teal-500" />
                <span>Budget: Dh{project.budget.toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to={`/tasks/`}
                className="bg-teal-500 hover:bg-teal-400 text-white py-2 px-3 rounded-md transition-colors duration-200 flex items-center gap-1 text-sm"
              >
                <Eye size={16} />
                View Tasks
              </Link>

              <Link
                to={`/projects/edit/${project._id}`}
                className="bg-teal-500 hover:bg-teal-400 text-white py-2 px-3 rounded-md transition-colors duration-200 flex items-center gap-1 text-sm"
              >
                <Edit size={16} />
                Edit
              </Link>

              <button
                onClick={() => deleteProject(project._id)}
                className="bg-red-600 hover:bg-red-500 text-white py-2 px-3 rounded-md transition-colors duration-200 flex items-center gap-1 text-sm"
              >
                <Trash2 size={16} />
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;