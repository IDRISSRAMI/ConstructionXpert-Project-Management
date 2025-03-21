import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Info } from "lucide-react"; // Ajout de l'icône Info pour "About Us"
import { FaProjectDiagram } from "react-icons/fa"; // Nouvelle icône pour le logo

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="px-6 py-4 bg-gradient-to-r from-blue-900 to-indigo-900"> {/* Nouveau fond dégradé */}
            <nav className="bg-opacity-90 bg-gray-900 text-white py-4 px-8 shadow-lg rounded-xl border-b-4 border-indigo-600">
                <div className="container mx-auto flex justify-between items-center">
                    <Link to="/" className="text-3xl font-bold tracking-tight flex items-center gap-2 group">
                        <FaProjectDiagram className="text-indigo-500 group-hover:text-indigo-300 transition-colors duration-300" size={30} /> {/* Nouvelle icône */}
                        <div>
                            <span className="text-white group-hover:text-indigo-300 transition-colors duration-300">Project</span>
                            <span className="text-indigo-500 group-hover:text-indigo-300 transition-colors duration-300">Master</span>
                        </div>
                    </Link>

                    <div className="hidden md:flex space-x-10">
                        <NavLink to="/" label="Home" />
                        <NavLink to="/about" label="About Us" /> {/* Ajout de la section "About Us" */}
                        {/* Add more NavLink components as needed */}
                    </div>

                    <button
                        className="md:hidden bg-indigo-600 hover:bg-indigo-500 p-3 rounded-full transition-colors duration-200"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {isOpen && (
                    <div className="md:hidden flex flex-col space-y-4 mt-4 bg-gray-900 border-l-4 border-indigo-500 p-6 rounded-lg">
                        <NavLink to="/" label="Home" />
                        <NavLink to="/about" label="About Us" /> {/* Ajout de la section "About Us" */}
                        {/* Add more NavLink components as needed */}
                    </div>
                )}
            </nav>
        </div>
    );
};

const NavLink = ({ to, label }) => (
    <Link
        to={to}
        className="font-semibold relative group"
    >
        <span className="text-white hover:text-indigo-400 transition-colors duration-200">{label}</span>
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 group-hover:w-full transition-all duration-300 ease-in-out"></span>
    </Link>
);

export default NavBar;