"use strict";
const mongoose = require("mongoose");

const formSchema = new mongoose.Schema(
  {
    Nombres: {
      type: String,
      required: true,
    },
    Apellidos: {
      type: String,
      required: true,
    },
    Usuario: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    versionKey: false,
  },
  
);

const Formulario = mongoose.model("Formulario", formSchema);

module.exports = Formulario;
