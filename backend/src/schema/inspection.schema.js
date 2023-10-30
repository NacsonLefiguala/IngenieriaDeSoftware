"use strict";

const Joi = require("joi");
const ROLES = require("../constants/roles.constants");

/**
 * Esquema de validación para el cuerpo de la solicitud de usuario.
 * @constant {Object}
 */
const inspectionBodySchema = Joi.object({
  lugar: Joi.string().required().messages({
    "string.empty": "Le lugar de la inspeccion no puede estar vacio.",
    "any.required": "el lugar de la inspeccion es obligatorio.",
    "string.base": "El lugar de la inspeccion tiene que ser de tipo string."
  }),
  fecha: Joi.string().required().messages({
    "string.empty": "la fecha no puede estar vacio.",
    "any.required": "la fecha es obligatorio.",
    "string.base": "la fecha tiene que ser de tipo string."
  }),
  observaciones: Joi.string().required().messages({
    "string.empty": "La observacion no puede estar vacío.",
    "any.required": "La observacion es obligatorio.",
    "string.base": "la Observacion",
  }),
  
});



module.exports = { inspectionBodySchema };
