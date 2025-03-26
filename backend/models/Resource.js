const mongoose = require("mongoose");
const Joi = require("joi");

const resourceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    quantity: { type: Number, required: true },
    supplier: { type: String, required: true }
});


const validateResource = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().messages({
      'string.empty': "Le nom est requis"
    }),
    type: Joi.string().required().messages({
      'string.empty': "Le type est requis"
    }),
    quantity: Joi.number().required().min(0).messages({
      'number.base': "La quantité est invalide",
      'any.required': "La quantité est requise",
      'number.min': "La quantité ne peut pas être négative"
    }),
    supplier: Joi.string().required().messages({
      'string.empty': "Le fournisseur est requis"
    })
  });

  return schema.validate(data, { abortEarly: false });
};

const Resource = mongoose.model('Resource', resourceSchema);

module.exports = { Resource, validateResource };