const express = require("express");
const router = express.Router();
const { Resource, validateResource } = require("../models/Resource");

// Récupération de toutes les ressources
router.get("/", async (req, res) => {
    try {
        const resources = await Resource.find();
        res.status(200).json(resources);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des ressources", error: error.message });
    }
});

// Récupération d'une ressource par son ID
router.get("/:id", async (req, res) => {
    try {
        const resource = await Resource.findById(req.params.id);
        
        if (!resource) {
            return res.status(404).json({ message: "Ressource non trouvée" });
        }
        
        res.status(200).json(resource);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération de la ressource", error: error.message });
    }
});

// Création d'une ressource
router.post("/", async (req, res) => {
    // Validation des données
    const { error } = validateResource(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    
    try {
        const { nom, description, dateDebut, dateFin } = req.body;
        const newResource = new Resource({ nom, description, dateDebut, dateFin });

        await newResource.save();
        res.status(201).json({ message: "Ressource ajoutée avec succès", resource: newResource });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de l'ajout de la ressource", error: error.message });
    }
});

// Mise à jour d'une ressource
router.put("/:id", async (req, res) => {
    // Validation des données
    const { error } = validateResource(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    
    try {
        const id = req.params.id;
        const { nom, description, dateDebut, dateFin } = req.body;

        const updatedResource = await Resource.findByIdAndUpdate(
            id, 
            { nom, description, dateDebut, dateFin }, 
            { new: true }
        );

        if (!updatedResource) {
            return res.status(404).json({ message: "Ressource non trouvée" });
        }

        res.status(200).json({ message: "Ressource mise à jour avec succès", resource: updatedResource });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la mise à jour", error: error.message });
    }
});

// Suppression d'une ressource
router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const deletedResource = await Resource.findByIdAndDelete(id);

        if (!deletedResource) {
            return res.status(404).json({ message: "Ressource non trouvée" });
        }

        res.status(200).json({ message: "Ressource supprimée avec succès", resource: deletedResource });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression", error: error.message });
    }
});

module.exports = router;