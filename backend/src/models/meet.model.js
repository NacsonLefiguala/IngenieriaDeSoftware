"use strict";

// Importa el modulo 'mongoose' para crear la conexion a la base de datos
const mongoose = require("mongoose");

// Crea el esquema de la coleccion 'roles'
const meetSchema = new mongoose.Schema(
  {
    date: {
        type: String,
        required: true,
    },
    hour: {
        type: String,
        required: true,
    },
    motive: {
        type: String,
        required: true,
    },
    state: {
      type: String,
      required: true,
      enum: ["Pendiente", "Confirmado", "Cancelado"],
      default: "Pendiente",
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
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
