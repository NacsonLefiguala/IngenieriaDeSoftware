"use strict";
// Importa el modulo 'mongoose' para crear la conexion a la base de datos
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Crea el esquema de la coleccion 'usuarios'
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    rut: {
      type: String,
      required: true,
    },
    fechaDeNacimiento: {
      type: Date,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
    Domicilios: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Domicilio",
      },
    ],
    Formulario: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Formulario",
      },
    ],
  },
  {
    versionKey: false,
  },
);

/** Encripta la contraseña del usuario */
userSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

/** Compara la contraseña del usuario */
userSchema.statics.comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword);
};

/** Modelo de datos 'User' */
const User = mongoose.model("User", userSchema);

// Exporta el modelo de datos 'User'
module.exports = User;
