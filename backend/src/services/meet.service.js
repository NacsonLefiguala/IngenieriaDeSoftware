"use strict";
// Importa el modelo de datos 'Meet'
const Meet = require("../models/meet.model.js");
const User = require("../models/user.model.js");
const { handleError } = require("../utils/errorHandler");
const { sendEmail } = require("../utils/emailHandler");
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
    const { date, hour, motive, state, user } = meet;
    
    const existingMeet = await Meet.findOne({ date, hour });

    if (existingMeet) {
      return [null, "La hora ya está ocupada"];
    }

    const newMeet = new Meet({
      date,
      hour,
      motive,
      state,
      user,
      regist: Date.now(),
    });
    
    const userMail = await User.findById(meet.user);

    if (!userMail) {
      return [null, "Usuario no encontrado"];
    }

    const recipientEmail = userMail.email;
    console.log(recipientEmail);

    const mailOptions = {
      from: "tu_correo@gmail.com",
      to: recipientEmail,
      subject: "Recordatorio de Cita",
      text: `Tienes una cita programada para el ${meet.date} a las ${meet.hour}. ${meet.motive}`,
    };

    await sendEmail(mailOptions);
    await newMeet.save();

    return [newMeet, null];
  } catch (error) {
    handleError(error, "meet.service -> postMeet");
  }
};

/**
 * Encuentra las citas de un usuario
 * @param {String} id Id del usuario
 * @returns {Promise} Promesa con el objeto de citas
 */
async function getMeetByUser(id) {
  try {
    const meets = await Meet.find({ user: id }).exec();
    if (!meets) return [null, "No hay citas"];

    return [meets, null];
  } catch (error) {
    handleError(error, "meet.service -> getMeetByUser");
  }
}

/**
 * Actualiza el estado de una cita de la base de datos
 * @param {String} id Id de la cita
 * @param {Object} meet Objeto de cita
 * @returns {Promise} Promesa con el objeto de cita actualizado
 */
async function putMeet(id, meet) {
  try {
    const updatedMeet = await Meet.findByIdAndUpdate(id, meet, {
      new: true,
    }).exec();
    if (!updatedMeet) return [null, "No existe la cita"];

    return [updatedMeet, null];
  } catch (error) {
    handleError(error, "meet.service -> putMeet");
  }
}

/**
 * Elimina una cita de la base de datos
 * @param {String} id Id de la cita
 * @returns {Promise} Promesa con el objeto de citas
 */
async function deleteMeet(id) {
  try {
    const meet = await Meet.findByIdAndDelete(id).exec();
    if (!meet) return [null, "No existe la cita"];

    return [meet, null];
  } catch (error) {
    handleError(error, "meet.service -> deleteMeet");
  }
}


module.exports = {
    getMeet,
    postMeet,
    getMeetById,
    getMeetByUser,
    deleteMeet,
    putMeet,
  };
