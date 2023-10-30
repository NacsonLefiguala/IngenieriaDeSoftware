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

    const { formularioId } = req.params;
    const  formularios  = await Formulario.find({formulario: formularioId});

    respondSuccess(req, res, 201, formularios);
    //return res.status(200).json(inspections);
  } catch (error) {
    handleError(error, "form.controller -> getFormularios");
    respondError(req, res, 500, "Error al obtener las inspecciones del inspector.");
  }
}

async function updateForm(req, res) {
  try {
    console.log("Cuerpo de la solicitud:", req.body);
    const { formularioId } = req.params; // Usar req.params para obtener el _id
    const { Nombres, Apellidos } = req.body; // Obtener observaciones desde el cuerpo de la solicitud

    // Buscar la inspección por el _id y actualizar las observaciones
    const formulario = await Formulario.findOneAndUpdate(
      { _id: formularioId },
      { Nombres, Apellidos },
      { new: true }
    );

    if (!formulario) {
      return res.status(404).json({ error: "Formulario no encontrada." });
    }
    respondSuccess(req, res, 201, formulario);
    
  } catch (error) {
    
    console.error(error);
    return res.status(500).json({ error: "Error al agregar nombre." });
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
  updateForm,
};
