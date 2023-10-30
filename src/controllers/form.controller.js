"use strict";

const Formulario = require("../models/form.model");
const FormService = require("../services/form.service");
const { handleError } = require("../utils/errorHandler");
const { respondSuccess, respondError } = require("../utils/resHandler");
/**
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function createFormulario(req, res) {
  try {
    const { Nombres, Apellidos, Usuario } = req.body;


    // Crear una nueva inspección
    const formulario = new Formulario({
      Nombres,
      Apellidos,
      Usuario,
    });

    // Guardar la inspección en la base de datos
    const FormGuardada = await formulario.save();

    // Mostrar el ID de la inspección en la consola
    console.log("ID de formulairo", FormGuardada._id);

    respondSuccess(req, res, 201, FormGuardada);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al crear el formulario." });
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

