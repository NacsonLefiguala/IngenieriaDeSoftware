const mongoose = require("mongoose");

const inspectionSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  lugar: String,
  fecha: Date,
  observaciones: String,
  inspector: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  estado: {
    type: String,
    enum: ["en espera", "aprobado", "rechazado"],
    default: "en espera",
  },
});

const Inspection = mongoose.model("Inspection", inspectionSchema);

module.exports = Inspection;


