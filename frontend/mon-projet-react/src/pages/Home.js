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
    <div className="relative min-h-screen">
      {/* Vidéo en arrière-plan */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="https://videos.pexels.com/video-files/2835998/2835998-sd_640_360_24fps.mp4" // Remplacez cette URL par le lien vers votre vidéo
        type="video/mp4"
        autoPlay
        loop
        muted
      />
      
      {/* Superposition de fond noir transparent pour améliorer la lisibilité */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>

      {/* Contenu principal */}
      <div className="relative container mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Gestion des Projets</h1>
          <Link
            to="/projects/add"
            className="bg-teal-600 hover:bg-teal-500 text-white py-2 px-6 rounded-full shadow-md transition-all duration-300 flex items-center gap-2"
          >
            <Plus size={18} />
            Nouveau Projet
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project._id}
              className="bg-gradient-to-r from-teal-600 to-green-600 text-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <h2 className="text-xl font-semibold mb-4 truncate">
              <span className="font-semibold mr-2">nom du projet:</span>
                {project.nom || 'Sans titre'}
                
              </h2>
              
              <p className="text-gray-200 mb-4"><span className="font-semibold mr-2">Déscription:</span>{project.description}</p>

              <div className="space-y-3">
                <div className="flex items-center text-gray-200">
                  <span className="font-semibold mr-2">Début:</span>
                  <span>{new Date(project.dateDebut).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center text-gray-200">
                  <span className="font-semibold mr-2">Fin:</span>
                  <span>{new Date(project.dateFin).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center text-gray-200">
                  <span className="font-semibold mr-2">Budget:</span>
                  <span>{project.budget.toLocaleString()} MAD</span>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-4">
                <Link
                  to={`/tasks/`}
                  className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-md transition-all duration-300 flex items-center gap-1 text-sm"
                >
                  <Eye size={16} />
                  Voir les Tâches
                </Link>

                <Link
                  to={`/projects/edit/${project._id}`}
                  className="bg-teal-500 hover:bg-teal-400 text-white py-2 px-4 rounded-md transition-all duration-300 flex items-center gap-1 text-sm"
                >
                  <Edit size={16} />
                  Modifier
                </Link>

                <button
                  onClick={() => deleteProject(project._id)}
                  className="bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded-md transition-all duration-300 flex items-center gap-1 text-sm"
                >
                  <Trash2 size={16} />
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
