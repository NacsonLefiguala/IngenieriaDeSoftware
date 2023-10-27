const express = require("express");
const router = express.Router();
const inspectionController = require("../controllers/inspection.controller");
const { isInspector } = require("../middlewares/authorization.middleware");

// Rutas
router.post("/inspections", isInspector, (req, res) => {
  console.log("Solicitud POST recibida en /inspections");
  inspectionController.createInspection(req, res);
});

router.put("/:inspectionId/observations", isInspector, (req, res) => {
  console.log(`Solicitud PUT recibida en /inspections/${req.params.inspectionId}/observations`);
  inspectionController.addObservations(req, res);
});

router.put("/:inspectionId/status", isInspector, (req, res) => {
  console.log(`Solicitud PUT recibida en /inspections/${req.params.inspectionId}/status`);
  inspectionController.changeInspectionStatus(req, res);
});

router.get("/inspector/:inspectorId", isInspector, inspectionController.getInspectionsByInspectorId);

router.post("/:inspectionId/uploadjpg", isInspector, inspectionController.uploadJPG);

module.exports = router;



/*const express = require("express");
const router = express.Router();
const inspectionController = require("../controllers/inspection.controller");

// Rutas
router.post("/inspections", inspectionController.createInspection);
router.put("/:username/observations", inspectionController.addObservations);
router.put("/:inspectorId/status", inspectionController.changeInspectionStatus);

module.exports = router;*/

/*////////////////const express = require("express");
const router = express.Router();
const inspectionController = require("../controllers/inspection.controller");

// Rutas
router.post("/inspections", (req, res) => {
  console.log("Solicitud POST recibida en /inspections");
  inspectionController.createInspection(req, res);
});

router.put("/:inspectionId/observations", (req, res) => {
  console.log(`Solicitud PUT recibida en /inspections/${req.params.inspectionId}/observations`);
  inspectionController.addObservations(req, res);
});

router.put("/:inspectionId/status", (req, res) => {
  console.log(`Solicitud PUT recibida en /inspections/${req.params.inspectionId}/status`);
  inspectionController.changeInspectionStatus(req, res);
});

/*router.get("/:inspectionId/inspections", (req, res) => {
  console.log(`Solicitud PUT recibida en /inspections/${req.params.inspectorId}/inspections`);
  inspectionController.getInspectionsByInspectorId(req, res);
});*/

/*/////////////router.get("/inspector/:inspectorId", inspectionController.getInspectionsByInspectorId);
//router.get(":inspectorId/inspections", inspectionController.getInspectionsByInspectorId);

module.exports = router;//////////////////*/






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






