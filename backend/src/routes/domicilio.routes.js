"use strict";

const express = require("express");

const domiciliocontroller = require("../controllers/domicilio.controller");
const upload = require("../middlewares/pdf.middleware");
const router = express.Router();

router.get("/", domiciliocontroller.getDomicilios);
router.post("/", (req, res) => {
    domiciliocontroller.createDomicilio(req, res);
  });
router.put("/:id", domiciliocontroller.updateDomicilio);
router.post("/:DomicilioId/upload", upload(), (req, res) => {
    console.log(req.file);
    domiciliocontroller.uploadPDF(req, res);
  });

module.exports = router;
