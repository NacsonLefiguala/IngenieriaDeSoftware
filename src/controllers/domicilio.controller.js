"use-strict";

const DomicilioService = require("../services/domicilio.service");
const UsuarioService = require("../services/user.service");
const { handleError } = require("../utils/errorHandler");
const { domicilioBodySchema, domicilioIdSchema } = require("../schema/domicilio.schema");
const { respondSuccess, respondError } = require("../utils/resHandler");
const multer = require("multer");

/**
 * Crea un nuevo domicilio
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function createDomicilio(req, res) {
    try {
      const { body } = req;
      // Validar el cuerpo de la solicitud
      const { error: bodyError } = domicilioBodySchema.validate(body);
      if (bodyError) return respondError(req, res, 400, bodyError.message);
  
      // Crear el nuevo domicilio
      const { domicilioError, nuevoDomicilio } = await DomicilioService.createDomicilio(body);
  
      if (domicilioError) return respondError(req, res, 400, domicilioError);
      if (!nuevoDomicilio) {
        return respondError(req, res, 400, "No se pudo crear el domicilio");
      }
  
      respondSuccess(req, res, 201, nuevoDomicilio);
    } catch (error) {
      handleError(error, "domicilio.controller -> createDomicilio");
      respondError(req, res, 500, "No se creo el domicilio");
    }
  }

/**
 * Obtiene todos los domicilios
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function getDomicilios(req, res) {
  try {
    const userId = req.params.userId; // ID del usuario
    const domicilios = await UsuarioService.obtenerDomiciliosDeUsuario(userId);

    if (domicilios.length === 0) {
      res.status(204).json({ message: "El usuario no tiene domicilios asociados" });
    } else {
      res.status(200).json(domicilios);
    }
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
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


// Configuracion de donde se almacenarán los archivos .jpg
const storage = multer.diskStorage({
  /**
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
  destination: async function(req, file, cb) {
    cb(null, "../uploads"); // Carpeta donde se almacenarán los archivos
  },
  /**
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
  filename: async function(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

/** función para cargar archivos .jpg
* Agregar una nueva función para cargar archivos .jpg
*/
async function uploadPDF(req, res) {
  try {
    upload.single("pdfFile")(req, res, async function(err) {
      if (err instanceof multer.MulterError) {
        respondError(req, res, 400, "No se pudo cargar el archivo");
      } else if (err) {
        respondError(req, res, 500, "No se pudo crear el archivo");
      }

      const { domicilioId } = req.params;
      const archivo = req.file.filename; // Nombre del archivo guardado

      // Llama a la función del servicio para actualizar la inspección con el archivo .jpg
      const inspection = await Inspection.findOneAndUpdate(
        { _id: domicilioId },
        { archivo },
        { new: true },
      );


      return res.status(200).json(inspection);
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al cargar el archivo .jpg." });
  }
}

module.exports = {
    createDomicilio,
    getDomicilios,
    updateDomicilio,
    uploadPDF,
};

