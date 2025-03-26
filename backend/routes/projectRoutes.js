const express = require("express");
const { Project } = require("../models/Project");
const { Task } = require("../models/Task");
const router = express.Router();
const Joi = require("joi");


const validate = (data) => {
  const schema = Joi.object({
    nom: Joi.string().required().messages({
      "string.empty": "Le Nom est requis",
    }),
    description: Joi.string().required().messages({
      "string.empty": "La description est requise",
    }),
    dateDebut: Joi.date().required().messages({
      "date.base": "La date de début doit être une date valide",
      "any.required": "La date de début est requise",
    }),
    dateFin: Joi.date().required().greater(Joi.ref('dateDebut')).messages({
      "date.base": "La date de fin doit être une date valide",
      "any.required": "La date de fin est requise",
      "date.greater": "La date de fin doit suivre la date de début",
    }),
    budget: Joi.number().positive().required().messages({
      "number.base": "Le budget doit être un nombre",
      "number.positive": "Le budget doit être positif",
      "any.required": "Le budget est requis",
    }),
  });

  return schema.validate(data, { abortEarly: false });
};


router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });
  try {
    const newProjet = new Project({
      nom: req.body.nom,
      description: req.body.description,
      dateDebut: req.body.dateDebut,
      dateFin: req.body.dateFin,
      budget: req.body.budget
    });

    await newProjet.save();
    res.status(201).json({ message: "Projet ajouté avec succès", newProjet });
  } catch (error) {
    console.error("Erreur dans l'ajout du Projet:", error);
    res.status(500).json({ error: error.message });
  }
});


router.get("/Afficher", async (req, res) => {
  try {
    const projets = await Project.find().sort({Datedebut:-1/1});
    res.status(200).json(projets);

  } catch (error) {
    console.error("Erreur de l'affichage", error);
    res.status(500).json({ error: error.message });
  }
});


router.delete("/Supprimer/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTasks = await Task.deleteMany({ projectId: id });

    if (deletedTasks.deletedCount === 0) {
      console.log("Aucune tâche associée trouvée pour ce projet.");
    }

    const deletedProject = await Project.deleteOne({ _id: id });

    if (deletedProject.deletedCount === 0) {
      return res.status(404).json({ message: "Projet non trouvé" });
    }

    res.status(200).json({ message: 'Projet et tâches associées supprimés avec succès.' });
  } catch (error) {
    console.error('Erreur lors de la suppression du projet:', error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la suppression du projet.' });
  }
});


router.put("/Modifier/:id", async (req, res) => {
  const { id } = req.params;

  const { error } = validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  try {
    const projet = await Project.findById(id);
    if (!projet) {
      return res.status(404).json({ message: "Projet non trouvé" });
    }

    projet.nom = req.body.nom;
    projet.description = req.body.description;
    projet.dateDebut = req.body.dateDebut;
    projet.dateFin = req.body.dateFin;
    projet.budget = req.body.budget;

    await projet.save();

    res.status(200).json({ message: "Projet modifié avec succès", projet });
  } catch (error) {
    console.error("Erreur lors de la modification du projet:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;