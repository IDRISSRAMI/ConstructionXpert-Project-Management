const mongoose = require("mongoose");
const Joi = require("joi");

const taskSchema = new mongoose.Schema({

  nom: { 
    type: String, 
    required: true
},
    description: { 
        type: String, 
        required: true
    },
    dateDebut: { 
        type: Date,
        required: true
    },
    dateFin: { 
        type: Date, 
        required: true
    },
    
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    }
});



const validateTask = (data) => {
  const schema = Joi.object({
    description: Joi.string().required().messages({
      'string.empty': "La description est requise"
    }),
    dateDebut: Joi.date().required().messages({
      'date.base': "La date de debut est invalide",
      'any.required': "La date de debut est requise"
    }),
    dateFin: Joi.date().required().greater(Joi.ref('dateDebut')).messages({
      'date.base': "La date de fin est invalide",
      'any.required': "La date de fin est requise",
      'date.greater': "La date de fin doit suivre la date de debut"
    }),
    projectId: Joi.string().required().messages({
      'string.empty': "L'ID du projet est requis"
    })
  });

  return schema.validate(data, { abortEarly: false });
};

const Task = mongoose.model("Task", taskSchema);

module.exports = { Task, validateTask };