const express = require("express");
const inspectionRoutes = require("./inspection.routes.js");
const userRoutes = require("./user.routes.js");
const authRoutes = require("./auth.routes.js");
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

const router = express.Router();

router.use("/users", authenticationMiddleware, userRoutes);
router.use("/auth", authRoutes);

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


/*const express = require("express");
const inspectionRoutes = require("./inspection.routes.js");
const userRoutes = require("./user.routes.js");
const authRoutes = require("./auth.routes.js");
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

const router = express.Router();

router.use("/users", authenticationMiddleware, userRoutes);
router.use("/auth", authRoutes);

// Agrega console.log para registrar las rutas en el archivo routes.index
router.use("/inspections", (req, res, next) => {
  console.log(`Solicitud a la ruta /inspections${req.url}`);
  next();
}, inspectionRoutes);

router.use("/observations", (req, res, next) => {
  console.log(`Solicitud a la ruta /observations${req.url}`);
  next();
}, inspectionRoutes);

module.exports = router;*/


