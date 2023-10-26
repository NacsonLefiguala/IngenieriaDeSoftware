"use strict";
// Importa el modelo de datos 'Meet'
const Meet = require("../models/meet.model.js");
const { handleError } = require("../utils/errorHandler");

/**
 * Obtiene todas las citas de la base de datos
 * @returns {Promise} Promesa con el objeto de las citas
 */
async function getMeet() {
    try {
        const meets = await Meet.find().exec();
        if (!meets) return [null, "No hay citas"];
    
        return [meets, null];
    } catch (error) {
        handleError(error, "meet.service -> getMeet");
    }
}

/**
 * Obriene cita por id
 * @param {String} id Id de la cita
 * @returns {Promise} Promesa con el objeto de la cita
 */
async function getMeetById(id) {
    try {
        const meet = await Meet.findById(id).exec();
        if (!meet) return [null, "No existe la cita"];
    
        return [meet, null];
    } catch (error) {
        handleError(error, "meet.service -> getMeetById");
    }
}

/**
 * Crea una nueva cita en la base de datos
 * @param {Object} meet Objeto de cita
 * @returns {Promise} Promesa con el objeto de cita creado
 */
async function postMeet(meet) {
  try {
    const { userId, date, motive, notes } = meet;

    const newMeet = new Meet({
      user: userId,
      date,
      motive,
      notes,
      regist: Date.now(),
    });
    await newMeet.save();

    return [newMeet, null];
//    console.log("Cita creada");
  } catch (error) {
    handleError(error, "meet.service -> postMeet");
  }
};

module.exports = {
    getMeet,
    postMeet,
    getMeetById,
  };
