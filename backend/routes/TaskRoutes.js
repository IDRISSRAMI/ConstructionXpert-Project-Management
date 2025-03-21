const express = require("express");
const router = express.Router();
const { Task, validateTask } = require("../models/Task");
const { Project } = require("../models/Project");

// Récupération de toutes les tâches
router.get("/", async (req, res) => {
    try {
        const tasks = await Task.find().populate('projectId', 'nom');
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des tâches", error: error.message });
    }
});

// Récupération des tâches d'un projet spécifique
router.get("/project/:projectId", async (req, res) => {
    try {
        const projectId = req.params.projectId;
        
        // Vérifier si le projet existe
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

// Récupération d'une tâche par son ID
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

// Création d'une tâche
router.post("/", async (req, res) => {
    // Validation des données
    const { error } = validateTask(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    
    try {
        const { description, dateDebut, dateFin, projectId } = req.body;
        
        // Vérifier si le projet existe
        const projectExists = await Project.exists({ _id: projectId });
        if (!projectExists) {
            return res.status(404).json({ message: "Projet non trouvé" });
        }
        
        const newTask = new Task({ description, dateDebut, dateFin, projectId });
        await newTask.save();
        
        res.status(201).json({ message: "Tâche ajoutée avec succès", task: newTask });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de l'ajout de la tâche", error: error.message });
    }
});

// Mise à jour d'une tâche
router.put("/:id", async (req, res) => {
    // Validation des données
    const { error } = validateTask(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    
    try {
        const id = req.params.id;
        const { description, dateDebut, dateFin, projectId } = req.body;
        
        // Vérifier si le projet existe
        const projectExists = await Project.exists({ _id: projectId });
        if (!projectExists) {
            return res.status(404).json({ message: "Projet non trouvé" });
        }
        
        const updatedTask = await Task.findByIdAndUpdate(
            id, 
            { description, dateDebut, dateFin, projectId }, 
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

// Suppression d'une tâche
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