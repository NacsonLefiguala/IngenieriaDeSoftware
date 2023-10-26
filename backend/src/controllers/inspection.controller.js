// controlador de inspecciones (inspection.controller.js)
const Inspection = require("../models/inspection.model");
const mongoose = require("mongoose");

// Función para crear una nueva inspección y asignarla a un inspector
// inspection.controller.js

async function createInspection(req, res) {
  try {
    const { lugar, fecha, observaciones, inspectorId } = req.body;

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

    return res.status(201).json(inspeccionGuardada);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al crear la inspección." });
  }
}


async function addObservations(req, res) {
  try {
    console.log("Cuerpo de la solicitud:", req.body);
    const { inspectionId } = req.params; // Usar req.params.inspectionId para obtener el _id
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

    return res.status(200).json(inspection);
  } catch (error) {
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

    return res.status(200).json(inspection);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al cambiar el estado de la inspección." });
  }
}


async function getInspectionsByInspectorId(req, res) {
  try {
    const { inspectorId } = req.params;

    // Llama a la función del servicio para obtener inspecciones por el inspectorId
    const inspections = await Inspection.find({ inspector: inspectorId });

    // Devuelve las inspecciones como respuesta
    return res.status(200).json(inspections);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al obtener las inspecciones del inspector." });
  }
}

module.exports = {
  createInspection,
  addObservations,
  changeInspectionStatus,
  getInspectionsByInspectorId
};


