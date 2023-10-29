"use strict";

const express = require("express");

const domiciliocontroller = require("../controllers/domicilio.controller");

const router = express.Router();

router.get("/", domiciliocontroller.getDomicilios);// ! arreglar estructura controlador o algo
router.post("/", domiciliocontroller.createDomicilio);
/** Error en el POST
 * ! ❌ [ERROR] A ocurrido un error en: 
 * !📁 domicilio.service -> createDomicilio
 * !🗯  Cannot destructure property 'ciudad' of 'req.body' as it is undefined.
 * !❌ [ERROR] A ocurrido un error en:
 * !📁 domicilio.controller -> createDomicilio
 * !🗯  Cannot destructure property 'domicilioError' of '(intermediate value)' as it is undefined.
 * !POST /api/users/651a0459ec0359a633ea23c3/formularioRegularizacion/6536f5595163b3f985293116/domicilios/ 500 7.535 ms - 66
*/
router.put("/:id", domiciliocontroller.updateDomicilio);
router.post("/upload", domiciliocontroller.uploadPDF); // !NO encuentra solucion a multer

module.exports = router;
