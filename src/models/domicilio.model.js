"use strict";
// Importa el modulo 'mongoose' para crear la conexion a la base de datos
const mongoose = require("mongoose");

// Crea el esquema de la coleccion 'usuarios'
const domicilioSchema = new mongoose.Schema(
  {
    Ciudad: {
      type: String,
      required: true,
    },
    Calle: {
      type: String,
      required: true,
    },
    PDF: {
        type: String,
        required: true,
    },
  },
  {
    versionKey: false,
  },
);

/** Modelo de datos 'User' */
const Domicilio = mongoose.model("Domicilio", domicilioSchema);

// Exporta el modelo de datos 'User'
module.exports = Domicilio;
