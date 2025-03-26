const express = require("express");
const router = express.Router();
const { Resource, validateResource } = require("../models/Resource");


router.get("/", async (req, res) => {
    try {
        const resources = await Resource.find();
        res.status(200).json(resources);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des ressources", error: error.message });
    }
});


router.get("/project/:projectId", async (req, res) => {
    try {
        const projectId = req.params.projectId;
        const resources = await Resource.find({ projectId: projectId });
        res.status(200).json(resources);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des ressources", error: error.message });
    }
});


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


router.post("/", async (req, res) => {
    
    const { error } = validateResource(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    
    try {
        const { name, type, quantity, supplier } = req.body;
        const newResource = new Resource({ 
            name,
            type, 
            quantity, 
            supplier 
        });

        await newResource.save();
        res.status(201).json({ message: "Ressource ajoutée avec succès", resource: newResource });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de l'ajout de la ressource", error: error.message });
    }
});


router.put("/:id", async (req, res) => {
    
    const { error } = validateResource(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    
    try {
        const id = req.params.id;
        const { name, type, quantity, supplier } = req.body;

        const updatedResource = await Resource.findByIdAndUpdate(
            id, 
            { name, type, quantity, supplier }, 
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