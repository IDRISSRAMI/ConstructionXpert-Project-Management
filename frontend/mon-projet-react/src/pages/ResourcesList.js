import React from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Plus } from 'lucide-react';

const ResourcesList = () => {
  const resources = [
    {
      id: 1,
      name: 'Cement Bags',
      type: 'Material',
      quantity: 100,
      supplier: 'ABC Constructions',
    },
    {
      id: 2,
      name: 'Excavator',
      type: 'Equipment',
      quantity: 2,
      supplier: 'XYZ Rentals',
    },
  ];

  return (
    <div className="container mx-auto p-6 bg-gradient-to-r from-green-900 to-teal-900 min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-semibold text-white">Gestion des Ressources</h1>
        <Link
          to="/resources/add"
          className="bg-teal-600 hover:bg-teal-500 text-white py-2 px-4 rounded-lg shadow-md transition-colors duration-300 flex items-center gap-2"
        >
          <Plus size={18} />
          Nouvelle Ressource
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {resources.map((resource) => (
          <div
            key={resource.id}
            className="bg-gradient-to-r from-teal-600 to-green-600 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            <h2 className="text-xl font-semibold mb-4">{resource.name}</h2>
            <p className="text-lg mb-2">Type: <span className="text-gray-200">{resource.type}</span></p>
            <p className="text-lg mb-2">Quantité: <span className="text-gray-200">{resource.quantity}</span></p>
            <p className="text-lg mb-4">Fournisseur: <span className="text-gray-200">{resource.supplier}</span></p>

            <div className="flex justify-between items-center">
              <Link
                to={`/resources/edit`}
                className="bg-teal-500 hover:bg-teal-400 text-white py-2 px-3 rounded-md transition-all duration-300 flex items-center gap-1"
              >
                <Edit size={16} />
                Modifier
              </Link>
              <button
                className="bg-red-600 hover:bg-red-500 text-white py-2 px-3 rounded-md transition-all duration-300 flex items-center gap-1"
              >
                <Trash2 size={16} />
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourcesList;