const Inspection = require("../models/inspection.model");

async function createInspection(lugar, fecha, observaciones, inspectorId) {
  try {
    const inspection = new Inspection({
      lugar,
      fecha,
      observaciones,
      inspector: inspectorId,
    });

    await inspection.save();

    return inspection;
  } catch (error) {
    throw error;
  }
}

async function addObservations(inspectionId, observaciones) {
  try {
    const inspection = await Inspection.findOneAndUpdate(
      { _id: inspectionId },
      { observaciones },
      { new: true }
    );

    if (!inspection) {
      throw new Error("Inspección no encontrada.");
    }

    return inspection;
  } catch (error) {
    throw error;
  }
}


async function changeInspectionStatus(inspectionId, nuevoEstado) {
  try {
    const inspection = await Inspection.findOneAndUpdate(
      { _id: inspectionId }, // condiciones para buscar el documento
      { estado: nuevoEstado }, // actualización que se aplicará
      { new: true }
    );

    if (!inspection) {
      throw new Error("Inspección no encontrada.");
    }

    return inspection;
  } catch (error) {
    throw error;
  }
}

async function getInspectionsByInspectorId(inspectorId) {
  try {
    // Busca todas las inspecciones que tienen el inspectorId proporcionado
    const inspections = await Inspection.find({ inspector: inspectorId });

    return inspections;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createInspection,
  addObservations,
  changeInspectionStatus,
  getInspectionsByInspectorId
};

