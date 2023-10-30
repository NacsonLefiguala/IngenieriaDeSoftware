"use strict";

const Joi = require("joi");

/**
 * @constant {Object}
 */
const formularioBodySchema = Joi.object({
  Nombres: Joi.string().required().messages({
    "string.empty": "Los nombres no puede estar vacíos.",
    "any.required": "Los nombres son obligatorios.",
    "string.base": "Los nombres deben ser de tipo string.",
  }),
  Apellidos: Joi.string().required().messages({
    "string.empty": "Los apellidos no pueden estar vacíos.",
    "any.required": "Los apellidos son obligatorios.",
    "string.base": "Los apellidos deben ser de tipo string.",
  }),
}).messages({
  "object.unknown": "No se permiten atributos adicionales.",
});

/**
 * @constant {Object}
 */
const formularioIdSchema = Joi.object({
  id: Joi.string()
    .required()
    .pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/)
    .messages({
      "string.empty": "El id no puede estar vacío.",
      "any.required": "El id es obligatorio.",
      "string.base": "El id debe ser de tipo string.",
      "string.pattern.base": "El id proporcionado no es un ObjectId válido.",
    }),
});

module.exports = { formularioBodySchema, formularioIdSchema };
