"use strict";

// Importa el modulo 'mongoose' para crear la conexion a la base de datos
const mongoose = require("mongoose");

// Crea el esquema de la coleccion 'roles'
const meetSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    date: {
        type: String,
        required: true,
    },

    motive: {
        type: String,
        required: true,
    },

    notes: {
        type: String,
        required: true,
    },

    regist: {
      type: Date,
      required: Date.now,
    },
  },
  {
    versionKey: false,
  },
);

/** Modelo de datos 'User' */
const Meet = mongoose.model("Meet", meetSchema);

// Exporta el modelo de datos 'User'
module.exports = Meet;
