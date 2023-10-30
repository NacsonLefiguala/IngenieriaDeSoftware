const express = require("express");
const router = express.Router();
const inspectionController = require("../controllers/inspection.controller");
const { isInspector } = require("../middlewares/authorization.middleware");
const jpgMiddleware = require("../middlewares/archivo.middleware");
const upload = require("../middlewares/archivo.middleware");


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

router.post("/upload", jpgMiddleware(), (req, res) => {
  console.log(req.file);
  res.send("archivo subido");
});

router.post("/:inspectionId/uploadjpg", upload, (req, res) => {
  console.log(`Solicitud POST recibida en /inspections/${req.params.inspectionId}/uploadjpg`);
  inspectionController.uploadJPG(req, res);
});

module.exports = router;


