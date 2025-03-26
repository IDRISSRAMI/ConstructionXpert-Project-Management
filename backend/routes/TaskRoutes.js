const express = require("express");
const router = express.Router();
const { Task } = require("../models/Task");
const { Project } = require("../models/Project");
const mongoose = require('mongoose');
const Joi = require('joi');


const validateTask = (task) => {
  const schema = Joi.object({
    nom: Joi.string().required(),
    description: Joi.string().required(),
    dateDebut: Joi.date().required(),
    dateFin: Joi.date().required().min(Joi.ref('dateDebut')),
    projectId: Joi.string().required()
  });
  return schema.validate(task);
};


const validateProjectId = (req, res, next) => {
  const { projectId } = req.body;
  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    return res.status(400).json({ message: "projectId doit être un ObjectId valide" });
  }
  next();
};


router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find().populate('projectId', 'nom');
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des tâches", error: error.message });
  }
});


router.get("/project/:projectId", async (req, res) => {
  try {
    const projectId = req.params.projectId;

    const projectExists = await Project.exists({ _id: projectId });
    if (!projectExists) {
      return res.status(404).json({ message: "Projet non trouvé" });
    }

    const tasks = await Task.find({ projectId });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des tâches", error: error.message });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('projectId', 'nom');

    if (!task) {
      return res.status(404).json({ message: "Tâche non trouvée" });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération de la tâche", error: error.message });
  }
});


router.post("/", validateProjectId, async (req, res) => {
  const { error } = validateTask(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const { nom, description, dateDebut, dateFin, projectId } = req.body;

    const projectExists = await Project.exists({ _id: projectId });
    if (!projectExists) {
      return res.status(404).json({ message: "Projet non trouvé" });
    }

    const newTask = new Task({ nom, description, dateDebut, dateFin, projectId });
    await newTask.save();

    res.status(201).json({ message: "Tâche ajoutée avec succès", task: newTask });
  } catch (error) {
    console.error("Erreur lors de l'ajout de la tâche:", error);
    res.status(500).json({ message: "Erreur interne du serveur", error: error.message });
  }
});


router.put("/:id", validateProjectId, async (req, res) => {
  const { error } = validateTask(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const id = req.params.id;
    const { nom, description, dateDebut, dateFin, projectId } = req.body;

    const projectExists = await Project.exists({ _id: projectId });
    if (!projectExists) {
      return res.status(404).json({ message: "Projet non trouvé" });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { nom, description, dateDebut, dateFin, projectId },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Tâche non trouvée" });
    }

    res.status(200).json({ message: "Tâche mise à jour avec succès", task: updatedTask });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour", error: error.message });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ message: "Tâche non trouvée" });
    }

    res.status(200).json({ message: "Tâche supprimée avec succès", task: deletedTask });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression", error: error.message });
  }
});

module.exports = router;