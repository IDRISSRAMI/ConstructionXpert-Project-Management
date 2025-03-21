const mongoose = require("mongoose");
const Joi = require("joi");

const resourceSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    description: { type: String, required: true },
    dateDebut: { type: Date, required: true },
    dateFin: { type: Date, required: true }
});

// Validation avec Joi
const validateResource = (data) => {
  const schema = Joi.object({
    nom: Joi.string().required().messages({
      'string.empty': "Le nom est requis"
    }),
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
    })
  });

  return schema.validate(data, { abortEarly: false });
};

const Resource = mongoose.model('Resource', resourceSchema);

module.exports = { Resource, validateResource };