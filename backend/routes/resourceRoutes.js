const express = require("express");
const Resource = require("../models/Resource");
const router = express.Router();

// Ajouter une nouvelle ressource
router.post("/resources", async (req, res) => {
  const { name, type, quantity, supplierInfo } = req.body;
  try {
    const resource = new Resource({ name, type, quantity, supplierInfo });
    await resource.save();
    res.status(201).json(resource);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Obtenir toutes les ressources
router.get("/resources", async (req, res) => {
  try {
    const resources = await Resource.find();
    res.json(resources);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Mettre à jour une ressource
router.put("/resources/:id", async (req, res) => {
  try {
    const resource = await Resource.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!resource) {
      return res.status(404).json({ message: "Ressource non trouvée" });
    }
    res.json(resource);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Supprimer une ressource
router.delete("/resources/:id", async (req, res) => {
  try {
    const resource = await Resource.findByIdAndDelete(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: "Ressource non trouvée" });
    }
    res.json({ message: "Ressource supprimée" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
