import React from 'react';
import { createRoot } from 'react-dom/client'; // Importez createRoot
import App from './App';
import './index.css';
const container = document.getElementById('root');
const root = createRoot(container); // Créez une racine
root.render(<App />); // Utilisez root.render
