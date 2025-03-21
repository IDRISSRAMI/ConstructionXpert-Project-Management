import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Plus, Eye } from 'lucide-react';
import axios from 'axios';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      fetchTasks(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="container mx-auto p-8 bg-gradient-to-r from-green-900 to-teal-900 min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-semibold text-white">Gestion des Tâches</h1>
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
            <h2 className="text-xl font-semibold mb-4">{task.name}</h2>
            <p className="text-gray-200 mb-4">{task.description}</p>

            <div className="space-y-3">
              <div className="flex items-center text-gray-200">
                <span className="font-semibold">Start: </span>
                <span>{new Date(task.startDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center text-gray-200">
                <span className="font-semibold">End: </span>
                <span>{new Date(task.endDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center text-gray-200">
                <span className="font-semibold">Status: </span>
                <span>{task.status}</span>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-4">
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
              <Link
                to={`/resources`}
                className="bg-green-500 hover:bg-green-400 text-white py-2 px-4 rounded-md transition-all duration-300 flex items-center gap-1 text-sm"
              >
                <Eye size={16} />
                Voir
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;