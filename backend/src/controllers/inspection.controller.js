// controlador de inspecciones (inspection.controller.js)
const Inspection = require("../models/inspection.model");
const mongoose = require("mongoose");

// Función para crear una nueva inspección y asignarla a un inspector
async function createInspection(req, res) {
  try {
    const { lugar, fecha, observaciones, inspectorId } = req.body;

    // Crear un ObjectId válido para la inspección
    const inspectionId = new mongoose.Types.ObjectId();

    // Verificar si el inspector existe y si el usuario actual es un administrador
    // Asegúrate de que esto se ajuste a tu lógica de autorización
    // Esto podría requerir middleware de autenticación y autorización

    const inspection = new Inspection({
      _id: inspecorId, // Usar el ObjectId válido
      lugar,
      fecha,
      observaciones,
      inspector: inspectorId,
    });

    await inspection.save();

    return res.status(201).json(inspection);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al crear la inspección." });
  }
}


async function addObservations(req, res) {
  try {
    const { inspectorId, observaciones } = req.body;

    const inspection = await Inspection.findOneAndUpdate(
      inspectorId ,
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
    const { inspectionId, nuevoEstado } = req.body;

    const inspection = await Inspection.findOneAndUpdate(
      { _id: inspectionId }, // condiciones para buscar el documento
      { estado: nuevoEstado }, // actualización que se aplicará
      { new: true } // opciones, en este caso, para devolver el documento actualizado
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


module.exports = {
  createInspection,
  addObservations,
  changeInspectionStatus,
};


