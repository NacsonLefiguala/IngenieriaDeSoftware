"use strict";

const express = require("express");

const formController = require("../controllers/form.controller");

const authorizationMiddleware = require("../middlewares/authorization.middleware.js");

const router = express.Router();

const domicilioRoutes = require("./domicilio.routes");

router.use("/:form/domicilios", domicilioRoutes);// ?usuario accede a un formulario que no es suyo?
router.post("/", (req, res) => {
    formController.createFormulario(req, res);
  });
router.get("/", authorizationMiddleware.isAdmin, formController.getFormularios);
router.get("/:id", formController.getFormById);// ?usuario accede a un formulario que no es suyo?
router.get("/:formularioId/formulario", formController.getFormularios);

router.put("/:formularioId/update", (req, res) => {
  console.log(`Solicitud PUT recibida en /formulario/${req.params.formularioId}/update`);
  formController.updateForm(req, res);
});


module.exports = router;
