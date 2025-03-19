const mongoose = require("mongoose");

// Définition du schéma pour le projet
const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,  // Le nom du projet est obligatoire
  },
  description: {
    type: String,  // Utilisez String au lieu de string
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  budget: {
    type: Number,
    required: true,
  },
});

// Création du modèle à partir du schéma
const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
