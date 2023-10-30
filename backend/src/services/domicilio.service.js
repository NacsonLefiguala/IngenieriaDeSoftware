"use strict";

const { handleError } = require("../utils/errorHandler");
const Domicilio = require("../models/domicilio.model.js");
const User = require("../models/user.model.js");


async function createDomicilio(Ciudad, Calle, PDF, usuarioId) {
  try {
    const domicilio = new Domicilio({
      Ciudad,
      Calle,
      PDF,
      Usuario: usuarioId,
    });

    await domicilio.save();

    return domicilio;
  } catch (error) {
    throw error;
  }
}


/**
 * @param {Object} req - Objeto de petici贸n
 * @param {Object} res - Objeto de respuesta
 */
async function updateDomicilio(id, domicilio) {
  try {
    const domicilioFound = await Domicilio.findById(id);
    if (!domicilioFound) return [null, "El domicilio no existe"];

    const { ciudad, calle } = domicilio;

    const domicilioUpdated = await Domicilio.findByIdAndUpdate(
      id,
      {
        ciudad,
        calle,
      },
      { new: true },
    );

    return [domicilioUpdated, null];
  } catch (error) {
    handleError(error, "domicilio.service -> updateDomicilio");
  }
}

/**
 * @param {Object} id - Objeto de petici贸n
 * @param {Object}
 */
async function upload(domicilioId, pdf) {
  try {
    // Buscar la inspecci贸n por el ID y actualizar el campo archivoJPG
    const domicilio = await Domicilio.findByIdAndUpdate(
      { _id: domicilioId },
      { pdf },
      { new: true },
    );

    if (!domicilio) {
      throw new Error("Inspecci贸n no encontrada.");
    }

    return domicilio;
  } catch (error) {
    throw error;
  }
}

module.exports = {
    createDomicilio,
    updateDomicilio,
    upload,
};
