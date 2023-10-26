"use strict";
// Importa el modulo 'express' para crear las rutas
const express = require("express");

/** Controlador de autenticación */
const meetController = require("../controllers/meet.controller.js");

/** Instancia del enrutador */
const router = express.Router();

// Define las rutas para la autenticación
router.get("/", meetController.getMeet);
router.get("/:id", meetController.getMeetById);
router.post("/", meetController.postMeet);

// Exporta el enrutador
module.exports = router;
