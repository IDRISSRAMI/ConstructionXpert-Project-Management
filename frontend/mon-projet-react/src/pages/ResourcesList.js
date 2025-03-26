import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Plus } from 'lucide-react';
import axios from 'axios';

const ResourcesList = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/resources');
        setResources(response.data);
      } catch (error) {
        setError('Erreur de chargement');
      } finally {
        setLoading(false);
      }
    };
    fetchResources();
  }, []);

  const deleteResource = async (id) => {
    if (window.confirm('Confirmer la suppression?')) {
      try {
        await axios.delete(`http://localhost:5000/api/resources/${id}`);
        setResources(resources.filter(res => res._id !== id));
      } catch (error) {
        console.error('Erreur:', error);
      }
    }
  };

  if (loading) return <div className="container mx-auto p-8 text-center text-white">Chargement des ressources...</div>;
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
          <h1 className="text-3xl font-semibold">Gestion des Ressources</h1>
          <Link
            to="/resources/add"
            className="bg-green-300 hover:bg-green-400 text-white py-2 px-6 rounded-lg transition-all duration-200 flex items-center gap-2"
          >
            <Plus size={18} />
            Nouvelle Ressource
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((resource) => (
            <div
              key={resource._id}
              className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <h2 className="text-xl font-semibold mb-4 truncate"> <span className="font-semibold mr-2">Nom Du Ressource:</span>
                {resource.name}
              </h2>
              <p className="text-gray-200 mb-4"><span className="font-semibold mr-2">Type:</span>{resource.type}</p>
              

              <div className="space-y-3">
                <div className="flex items-center text-gray-200">
                  <span className="font-semibold mr-2">Quantité:</span>
                  <span>{resource.quantity}</span>
                </div>
                <div className="flex items-center text-gray-200">
                  <span className="font-semibold mr-2">Fournisseur:</span>
                  <span>{resource.supplier}</span>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-4">
                <Link
                  to={`/resources/edit/${resource._id}`}
                  className="bg-teal-500 hover:bg-teal-400 text-white py-2 px-4 rounded-md transition-all duration-200 flex items-center gap-1 text-sm"
                >
                  <Edit size={16} />
                  Modifier
                </Link>

                <button
                  onClick={() => deleteResource(resource._id)}
                  className="bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded-md transition-all duration-200 flex items-center gap-1 text-sm"
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

export default ResourcesList;
