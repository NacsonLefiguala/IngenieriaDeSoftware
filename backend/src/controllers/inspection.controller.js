
const Inspection = require("../models/inspection.model");
const mongoose = require("mongoose");
const { handleError } = require("../utils/errorHandler");
const { respondSuccess, respondError } = require("../utils/resHandler");
const multer = require("multer");
const { inspectionBodySchema } = require("../schema/inspection.schema");
const uploadMiddleware = require("../middlewares/archivo.middleware");


// Función para crear una nueva inspección y asignarla a un inspector
async function createInspection(req, res) {
  try {
    const { lugar, fecha, observaciones, inspectorId } = req.body;

    // Validar los datos usando el esquema de validación
    const { error } = inspectionBodySchema.validate({
      lugar,
      fecha,
      observaciones,
    });

    if (error) {
      return respondError(req, res, 400, error.message);
    }

    // Crear una nueva inspección
    const inspection = new Inspection({
      lugar,
      fecha,
      observaciones,
      inspector: inspectorId,
    });

    // Guardar la inspección en la base de datos
    const inspeccionGuardada = await inspection.save();

    // Mostrar el ID de la inspección en la consola
    console.log('ID de la inspección guardada:', inspeccionGuardada._id);

    respondSuccess(req, res, 201, inspeccionGuardada);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al crear la inspección." });
  }
}



async function addObservations(req, res) {
  try {
    console.log("Cuerpo de la solicitud:", req.body);
    const { inspectionId } = req.params; // Usar req.params para obtener el _id
    const { observaciones } = req.body; // Obtener observaciones desde el cuerpo de la solicitud

    console.log("_id:", inspectionId);
    console.log("Observaciones:", observaciones);


    // Buscar la inspección por el _id y actualizar las observaciones
    const inspection = await Inspection.findOneAndUpdate(
      { _id: inspectionId },
      { observaciones },
      { new: true }
    );

    if (!inspection) {
      return res.status(404).json({ error: "Inspección no encontrada." });
    }
    respondSuccess(req, res, 201, inspection);
    //return res.status(200).json(inspection);
  } catch (error) {
    //handleError(error, "inspection.controller -> addObservations");
    //respondError(req, res, 500, error.message);
    console.error(error);
    return res.status(500).json({ error: "Error al agregar observaciones." });
  }
}


async function changeInspectionStatus(req, res) {
  try {
    const { inspectionId } = req.params; // Usar req.params._id para obtener el _id del documento
    const { nuevoEstado } = req.body;

    // Buscar la inspección por el _id del documento y actualizar el estado
    const inspection = await Inspection.findOneAndUpdate(
      { _id: inspectionId },
      { estado: nuevoEstado },
      { new: true }
    );

    if (!inspection) {
      return res.status(404).json({ error: "Inspección no encontrada." });
    }
    respondSuccess(req, res, 201, inspection);
    //return res.status(200).json(inspection);
  } catch (error) {
    //handleError(error, "inspection.controller -> changueInspectionStatus");
    //respondError(req, res, 500, error.message);
    console.error(error);
    return res.status(500).json({ error: "Error al cambiar el estado de la inspección." });
  }
}

async function getInspectionsByInspectorId(req, res) {
  try {
    const { inspectorId } = req.params;

    // Llama a la función del servicio para obtener inspecciones por el inspectorId
    const inspection = await Inspection.find({ inspector: inspectorId });

    // Devuelve las inspecciones como respuesta
    respondSuccess(req, res, 201, inspection);
    //return res.status(200).json(inspections);
  } catch (error) {
    handleError(error, "inspection.controller -> getInspectionsByInspectorId");
    respondError(req, res, 500, "Error al obtener las inspecciones del inspector.");
    //console.error(error);
    //return res.status(500).json({ error: "Error al obtener las inspecciones del inspector." });
  }
}

async function uploadJPG(req, res) {
  try {
    uploadMiddleware()(req, res, async function (err) {
      if (err) {
        return res.status(400).json({ error: "Error al cargar el archivo." });
      }

      const { inspectionId } = req.params; // Obtén el _id de la observación desde los parámetros
      const archivoJPG = req.body.fileName; // Obtén el nombre del archivo desde el cuerpo de la solicitud

      const inspection = await Inspection.findByIdAndUpdate(
        { _id: inspectionId },
        { archivoJPG },
        { new: true }
      );

      if (!inspection) {
        return res.status(404).json({ error: "inspecion no encontrada." });
      }

      return res.status(200).json({
        message: "Archivo subido y asociado a la inspecion.",
        updatedObservation: inspection,
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al cargar el archivo .jpg." });
  }
}


module.exports = {
  createInspection,
  addObservations,
  changeInspectionStatus,
  getInspectionsByInspectorId,
  uploadJPG
};


