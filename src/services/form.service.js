"use strict";
const { handleError } = require("../utils/errorHandler");
const Formulario = require("../models/form.model");
/**
 * @param {Object} formulario - Objeto de formulario a crear
 * @returns {Promise}
 */
async function createFormulario(formulario) {
    try {
      const { Nombres, Apellidos, Usuario } = formulario;
      const formularioFound = await Formulario.findOne({ Nombres: formulario.Nombres });
      if (formularioFound) {
        return [null, "El formulario ya existe"];
      }
      const newFormulario = new Formulario({
        Nombres,
        Apellidos,
        Usuario,
      });
      await newFormulario.save();
      // Devuelve el nuevo formulario y nulo para indicar que no hay errores.
      return [newFormulario, null];
    } catch (error) {
      // Manejo de errores: Registra el error y devuelve un arreglo con objeto nulo y el error.
      handleError(error, "form.service -> createFormulario");
      return [null, error];
    }
}
/**
 * Obtiene todos los formularios
 * @returns {Promise} Promesa con el objeto de los formularios
 */
async function getFormularios() {
  try {
    const formularios = await Formulario.find();
    if (!formularios) return [null, "No hay formularios"];

    return [formularios, null];
  } catch (error) {
    handleError(error, "form.service -> getFormularios");
  }
}
/**
 * Obtiene un formulario por su ID y su formulario asociado de la base de datos
 * @param {string} id - ID del formulario
 * @returns {Promise} Promesa con el objeto de formulario
 */
async function getFormById(id) {
  try {
    const formulario = await Formulario.findById({ _id: id })
      .exec();
    if (!formulario) return [null, "El formulario no existe"];
    return [formulario, null];
  } catch (error) {
    handleError(error, "form.service -> getFormById");
  }
}
module.exports = {
  createFormulario,
  getFormularios,
  getFormById,
};

