"use strict";
const nodemailer = require("nodemailer");
//        pass: "auck aqeh musb fqnb",

/**
 * Envia un correo electrónico
 * @param {Object} meet - Objeto de la cita
 * @returns {Promise} Promesa con el objeto de cita creado
 */
async function sendEmail(mailOptions) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "benguajardoherrera@gmail.com",
        pass: "auck aqeh musb fqnb",
      },
    });

    const info = await transporter.sendMail(mailOptions);
    console.log("Correo electrónico enviado: " + info.response);
  } catch (error) {
    console.error("Error al enviar el correo electrónico: " + error.message);
    throw error; 
  }
}

module.exports = { sendEmail };
