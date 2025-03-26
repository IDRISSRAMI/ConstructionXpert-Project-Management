import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Plus, Eye } from 'lucide-react';
import axios from 'axios';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [projects, setProjects] = useState({});



  const [projectname, setProjectname] = useState();


  
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/tasks');
      setTasks(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors de la récupération des tâches:', error);
      setError('Impossible de charger les tâches. Veuillez réessayer plus tard.');
      setLoading(false);
    }
  };


  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/projects/Afficher');
      const projectMap = {};
      response.data.forEach(project => {
        projectMap[project._id] = project.nom;

        setProjectname(project.nom);

         

      });
      
     
    } catch (error) {
      console.error('Erreur lors de la récupération des projets:', error);
    }
  };

  
  const deleteTask = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette tâche?')) {
      try {
        await axios.delete(`http://localhost:5000/api/tasks/${id}`);
        fetchTasks(); 
      } catch (error) {
        console.error('Erreur lors de la suppression de la tâche:', error);
        alert('Erreur lors de la suppression de la tâche');
      }
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchProjects();
  }, []);

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('fr-FR');
    } catch (error) {
      return 'Date invalide';
    }
  };

  if (loading) return <div className="container mx-auto p-8 text-center text-white">Chargement des tâches...</div>;
  if (error) return <div className="container mx-auto p-8 text-center text-red-300">{error}</div>;

  return (
    <div className="relative min-h-screen">
      
      <video 
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
      >
        <source src="https://videos.pexels.com/video-files/2835998/2835998-sd_640_360_24fps.mp4" type="video/mp4" />
        
      </video>
      
      
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>

      

      <div className="container mx-auto p-8 relative z-10 text-white">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-semibold">Gestion des Tâches</h1>
          <Link
            to="/tasks/add"
            className="bg-teal-600 hover:bg-teal-500 text-white py-2 px-6 rounded-full shadow-md transition-all duration-300 flex items-center gap-2"
          >
            <Plus size={18} />
            Nouvelle Tâche
          </Link>
        </div>


          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {tasks.map((task) => (
              <div
                key={task._id}
                className="bg-gradient-to-r from-teal-600 to-green-600 text-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                
                <h2 className="text-xl font-semibold mb-4 truncate">
                <span className="font-semibold mr-2">Nom du tache:</span>{task.nom ? task.nom : task.description.substring(0, 30)}
                  {(!task.nom && task.description.length > 30) ? '...' : ''}
                </h2>
                <p className="text-gray-200 mb-4"><span className="font-semibold mr-2">Description:</span>{task.description}</p>

                <div className="space-y-3">
                  <div className="flex items-center text-gray-200">
                    <span className="font-semibold mr-2">Projet:</span>
                   


                   <span>{task.projectId.nom}</span>




                  </div>
                  <div className="flex items-center text-gray-200">
                    <span className="font-semibold mr-2">Début:</span>
                    <span>{formatDate(task.dateDebut)}</span>
                  </div>
                  <div className="flex items-center text-gray-200">
                    <span className="font-semibold mr-2">Fin:</span>
                    <span>{formatDate(task.dateFin)}</span>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-4">
                  <Link
                    to={`/resources`}
                    className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-md transition-all duration-300 flex items-center gap-1 text-sm"
                  >
                    <Eye size={16} />
                    View les resource
                  </Link>
                  <Link
                    to={`/tasks/edit/${task._id}`}
                    className="bg-teal-500 hover:bg-teal-400 text-white py-2 px-4 rounded-md transition-all duration-300 flex items-center gap-1 text-sm"
                  >
                    <Edit size={16} />
                    Modifier
                  </Link>
                  <button
                    onClick={() => deleteTask(task._id)}
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

export default Tasks;
