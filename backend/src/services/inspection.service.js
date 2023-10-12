// inspection.service.js
const Inspection = require("../models/inspection.model");

async function createInspection(username, lugar, fecha, observaciones, inspectorId) {
  try {
    const inspection = new Inspection({
      username,
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

async function addObservations(inspectorId, observaciones) {
  try {
    const inspection = await Inspection.findOneAndUpdate(
       inspectorId ,
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

module.exports = {
  createInspection,
  addObservations,
};
