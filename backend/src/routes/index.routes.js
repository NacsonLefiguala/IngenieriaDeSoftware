const express = require("express");
const inspectionRoutes = require("./inspection.routes.js");
const userRoutes = require("./user.routes.js");
const authRoutes = require("./auth.routes.js");


/** Enrutador de citas */
const meetRoutes = require("./meet.routes.js"); 

/** Middleware de autenticación */
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

const router = express.Router();

router.use("/users", authenticationMiddleware, userRoutes);
router.use("/auth", authRoutes);
// Define las rutas para las citas /api/meets
router.use("/meet", meetRoutes);

// Aplica el middleware de autenticación a las rutas "/inspections" y "/observations"
router.use(["/inspections", "/observations"], authenticationMiddleware);

router.use("/inspections", (req, res, next) => {
  console.log(`Solicitud a la ruta /inspections${req.url}`);
  next();
}, inspectionRoutes);

router.use("/observations", (req, res, next) => {
  console.log(`Solicitud a la ruta /observations${req.url}`);
  next();
}, inspectionRoutes);

module.exports = router;
