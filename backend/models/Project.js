const mongoose = require('mongoose');
const Joi = require('joi');
const projectSchema = new mongoose.Schema({
  nom: { type: String, required: true, },
  description: { type: String, required: true },
  dateDebut: { type: Date, required: true },
  dateFin: { type: Date, required: true },
  budget: { type: Number, required: true },
  iDtache:{
    type:mongoose.Types.ObjectId,
    ref:'Task'
  }
});


const validateProject = (data) => {
  const schema = Joi.object({
    nom: Joi.string().required().messages({
      'string.empty': "Le Nom est requis"
    }),
    description: Joi.string().required().messages({
      'string.empty': "La description est requise"
    }),
    budget: Joi.number().positive().required().messages({
      'number.base': "Le budget est un nombre",
      'number.positive': "Le budget est positif",
      'any.required': "Le budget est requis"
    }),
    dateDebut: Joi.date().required().messages({
      'date.base': "La date de debut est invalide",
      'any.required': "La date de debut est requise"
    }),
    dateFin: Joi.date().required().greater(Joi.ref('dateDebut')).messages({
      'date.base': "La date de fin est invalide",
      'any.required': "La date de fin est requise",
      'date.greater': "La date de fin doit suivre la date de debut"
    })
  });

  return schema.validate(data, { abortEarly: false });
};

const Project = mongoose.model('Project', projectSchema);

module.exports = { Project, validateProject };