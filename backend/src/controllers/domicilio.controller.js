"use-strict";

const DomicilioService = require("../services/domicilio.service");
const { handleError } = require("../utils/errorHandler");
const { domicilioBodySchema, domicilioIdSchema } = require("../schema/domicilio.schema");
const { respondSuccess, respondError } = require("../utils/resHandler");
const Domicilio = require("../models/domicilio.model");
const uploadMiddleware = require("../middlewares/pdf.middleware");

/**
 * crea domicilio
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function createDomicilio(req, res) {
  try {
    const { Ciudad, Calle, PDF, Usuario } = req.body;


    // Crear una nueva inspección
    const domicilio = new Domicilio({
      Ciudad,
      Calle,
      PDF,
      Usuario,
    });

    // Guardar la inspección en la base de datos
    const domicilioGuardada = await domicilio.save();

    // Mostrar el ID de la inspección en la consola
    console.log("ID de la inspección guardada:", domicilioGuardada._id);

    respondSuccess(req, res, 201, domicilioGuardada);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al crear el domicilio." });
  }
}

/**
 * actualiza un domicilio por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function updateDomicilio(req, res) {
  try {
    const { params, body } = req;
    const { error: paramsError } = domicilioIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const { error: bodyError } = domicilioBodySchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    const [domicilio, domicilioError] = await DomicilioService.updateDomicilio(params.id, body);

    if (domicilioError) return respondError(req, res, 400, domicilioError);

    respondSuccess(req, res, 200, domicilio);
  } catch (error) {
    handleError(error, "domicilio.controller -> updateDomicilio");
    respondError(req, res, 500, "No se pudo actualizar el domicilio");
  }
}

/**
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function uploadPDF(req, res) {
  try {
    uploadMiddleware(req, res, async function(err) {
      if (err) {
        return res.status(400).json({ error: "Error al cargar el pdf." });
      }

      const { domicilioId } = req.params;
      const pdf = req.body.fileName;

      const upload = await Domicilio.findByIdAndUpdate(
        { _id: domicilioId },
        { pdf },
        { new: true },
      );

      if (!upload) {
        return res.status(404).json({ error: "inspecion no encontrada." });
      }

      return res.status(200).json({
        message: "Archivo subido y asociado a la domicilio.",
        updatedPDF: pdf,
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al cargar pdf." });
  }
}

module.exports = {
    createDomicilio,
    updateDomicilio,
    uploadPDF,
};
