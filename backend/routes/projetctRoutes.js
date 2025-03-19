const express = require("express");
const Project = require("../models/Project");
const router = express.Router();

router.post("/projects", async (req, res) => {
    const { name, description, startDate, endDate, budget } = req.body;
    try{
        const project = new Project({ name, description, startDate, endDate, budget});
        await project.save();
        res.status(201).json(project);
    } catch (err){
        res.status(500).json({ message: err.message});
    }
});
//obtenir tous les projet 
router.get("/projects", async (req, res) =>{
    try{
        const project = await Project.find();
        res.json(projects);

    }catch (err){
        res.status(500).json({message: err.message});

    }
});
//mettre a jour un projet 
router.put("/projects/:id",async (req, res)=>{
    try{
        const project = await Project.findByIdUpdate(req.params.id, req.body, { new: true });
        if(!project) {
            return res.status(404).json({ message: "Projet non trouvé"});
        }
        res.json(project);
    }catch (err) {
        res.status(500).json({ message: err.message });

    }
});
//supprimer projet 
router.delete("/projects/:id",async (req,res) =>{
    try{
        const project = await Project.findByIdAndDelete(req.params.id);
        if ( !project) {
            return res.status(404).json({message:"project non trouvé"});
        }
        res.json({message: "projet supprimé"});
    
    }catch (err){
        res.status(500).json({message: err.message });
    }
});
module.exports = router; 