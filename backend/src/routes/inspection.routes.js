const express = require("express");
const router = express.Router();
const inspectionController = require("../controllers/inspection.controller");

// Rutas
router.post("/inspections", inspectionController.createInspection);
router.put("/observations/:inspectorId/observations", inspectionController.addObservations);
router.put(":inspectorId/status", inspectionController.changeInspectionStatus);

module.exports = router;




/* const express = require('express');
const router = express.Router();

const inspectionController = require("../controllers/inspection.controller");


Ruta para crear una nueva inspección
router.post('/', inspectionController.createInspection);

router.post('/', inspectionController.addObservations);

router.get('/', inspectionController.createInspection);

router.get('/', inspectionController.addObservations);

router.put('/', inspectionController.addObservations);

module.exports = router;*/






