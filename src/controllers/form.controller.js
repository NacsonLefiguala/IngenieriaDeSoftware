"use strict";

const FormService = require("../services/form.service");
const { handleError } = require("../utils/errorHandler");
const { respondSuccess, respondError } = require("../utils/resHandler");
const { formularioBodySchema } = require("../schema/form.schema");
const { formularioIdSchema } = require("../schema/form.schema");
/**
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function createFormulario(req, res) {
  try {
    const { body } = req;
    const { error: bodyError } = formularioBodySchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    const [newForm, formError] = await FormService.createFormulario(body);

    if (formError) return respondError(req, res, 400, formError);
    if (!newForm) {
      return respondError(req, res, 400, "No se creó el formulario");
    }

    respondSuccess(req, res, 201, newForm);
  } catch (error) {
    handleError(error, "form.controller -> createFormulario");
    respondError(req, res, 500, "No se creó el formulario");
  }
}

/**
 * Obtiene todos los formularios
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function getFormularios(req, res) {
  try {
    const [formularios, errorFormularios] = await FormService.getFormularios();
    if (errorFormularios) return respondError(req, res, 404, errorFormularios);

    formularios.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, formularios);
  } catch (error) {
    handleError(error, "form.controller -> getFormularios");
    respondError(req, res, 400, error.message);
  }
}

/**
 * Obtiene un formulario por id de usuario
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function getFormById(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } = formularioIdSchema.validate(params);

    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const [formulario, errorFormulario] = await FormService.getFormById(params.id);

    if (errorFormulario) return respondError(req, res, 404, errorFormulario);

    respondSuccess(req, res, 200, formulario);
  } catch (error) {
    handleError(error, "form.controller -> getFormById");
    respondError(req, res, 500, "No se pudo obtener el formulario");
  }
}

module.exports = {
  createFormulario,
  getFormularios,
  getFormById,
};

