"use strict";

const { handleError } = require("../utils/errorHandler");
const Domicilio = require("../models/domicilio.model");
const User = require("../models/user.model.js");

/**
 * Crea un nuevo domicilio
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function createDomicilio(req, res) {
    try {
      const { ciudad, calle, user } = req.body;

      const domicilioFound = await domicilio.findOne({ ciudad: domicilio.Ciudad });
      if (domicilioFound) return [null, "El domicilio ya existe"];

      const newDomicilio = new Domicilio({
        ciudad,
        calle,
        user,
      });
      await newDomicilio.save();
    } catch (error) {
      handleError(error, "domicilio.service -> createDomicilio");
    }
  }

/**
 * Obtiene domicilios por id de usuario
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function getDomiciliosUser(id) {
  try {
    // Busca un usuario por su ID
    const user = await User.findById(id);

    if (!user) return [null, "Usuario no encontrado"];

    // Luego, busca los domicilios asociados a ese usuario
    const domicilios = await Domicilio.find({ _id: { $in: user.Domicilios } });

    if (!domicilios) return [null, "No hay domicilios asociados a este usuario"];

    return [domicilios, null];
  } catch (error) {
    handleError(error, "domicilio.service -> getDomiciliosUser");
  }
}


/**
 * @param {Object} req - Objeto de petición
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
 * @param {Object} id - Objeto de petición
 * @param {Object}
 */
async function upload(id, pdf) {
    // Buscar la inspección por el ID y actualizar el campo archivoJPG
    const archivo = await Domicilio.findByIdAndUpdate(
      { _id: id },
      { pdf },
      { new: true },
    );

    if (!archivo) {
      throw new Error("Inspección no encontrada.");
    }

    return archivo;
}

module.exports = {
    createDomicilio,
    getDomiciliosUser,
    updateDomicilio,
    upload,
};
