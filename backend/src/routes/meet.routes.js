"use strict";
// Importa el modulo 'express' para crear las rutas
const express = require("express");

/** Controlador de autenticación */
const meetController = require("../controllers/meet.controller.js");

/** Middlewares de autorización */
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");

/** Middleware de autenticación */
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

/** Instancia del enrutador */
const router = express.Router();

// Define el middleware de autenticación para todas las rutas
router.use(authenticationMiddleware);

// Define las rutas para las citas
router.get("/", authorizationMiddleware.isAdmin, meetController.getMeet);
router.get("/:id", authorizationMiddleware.isAdmin, meetController.getMeetById);
router.get("/user/:id", meetController.getMeetByUser);
router.put("/:id", authorizationMiddleware.isAdmin, meetController.putMeet);
router.post("/", meetController.postMeet);
router.delete("/:id", meetController.deleteMeet);

// Exporta el enrutador
module.exports = router;
