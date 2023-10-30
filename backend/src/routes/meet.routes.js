"use strict";
// Importa el modulo 'express' para crear las rutas
const express = require("express");

/** Controlador de autenticación */
const meetController = require("../controllers/meet.controller.js");

/** Instancia del enrutador */
const router = express.Router();

// Define las rutas para las citas
router.get("/", meetController.getMeet);
router.get("/:id", meetController.getMeetById);
router.get("/user/:id", meetController.getMeetByUser);
router.put("/:id", meetController.putMeet);
router.post("/", meetController.postMeet);
router.delete("/:id", meetController.deleteMeet);

// Exporta el enrutador
module.exports = router;
