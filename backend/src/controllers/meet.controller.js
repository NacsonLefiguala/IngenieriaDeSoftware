"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler");
const MeetService = require("../services/meet.service");
const { meetBodySchema } = require("../schema/meet.schema");
const { handleError } = require("../utils/errorHandler");

/**
 * Obtiene todas las citas
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function getMeet(req, res) {
  try {
    const [meets, errorMeets] = await MeetService.getMeet();
    if (errorMeets) return respondError(req, res, 404, errorMeets);

    meets.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, meets);
  } catch (error) {
    handleError(error, "meet.controller -> getMeets");
    respondError(req, res, 400, error.message);
  }
}

/**
 * Obtiene una cita por id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function getMeetById(req, res) {
  try {
    const { id } = req.params;
    const [meet, errorMeet] = await MeetService.getMeetById(id);
    if (errorMeet) return respondError(req, res, 404, errorMeet);

    respondSuccess(req, res, 200, meet);
  } catch (error) {
    handleError(error, "meet.controller -> getMeetById");
    respondError(req, res, 400, error.message);
  }
}

/**
 * Crea una nueva cita
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function postMeet(req, res) {
  try {
    const { body } = req;
    const { error: bodyError } = meetBodySchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    const [newMeet, meetError] = await MeetService.postMeet(body);

    if (meetError) return respondError(req, res, 400, meetError);
    if (!newMeet) {
      return respondError(req, res, 400, "No se creo la cita");
    }

    respondSuccess(req, res, 201, newMeet);
    } catch (error) {
      handleError(error, "meet.controller -> postMeet");
      respondError(req, res, 500, "No se creo la cita");
  }
}

module.exports = {
    getMeet,
    postMeet,
    getMeetById,
};
