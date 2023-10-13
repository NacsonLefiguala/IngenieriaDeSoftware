"use-strict";

const DomicilioService = require("../services/domicilio.service");
const UsuarioService = require("../services/usuario.service");
const { handleError } = require("../utils/errorHandler");
const { domicilioBodySchema, domicilioIdSchema } = require("../schema/domicilio.schema");
const { respondSuccess, respondError } = require("../utils/resHandler");

/**
 * Crea un nuevo usuario
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function createDomicilio(req, res) {
    try {
      const usuarioId = req.params.usuarioId; // ID del usuario
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
  
      // Asociar el domicilio al usuario utilizando el ID del domicilio recién creado
      const usuario = await UsuarioService.asociarDomicilioAUsuario(usuarioId, nuevoDomicilio._id);
  
      if (!usuario) {
        return respondError(req, res, 404, "Usuario no encontrado");
      }
  
      respondSuccess(req, res, 201, nuevoDomicilio);
    } catch (error) {
      handleError(error, "domicilio.controller -> createDomicilio");
      respondError(req, res, 500, "No se asignó el domicilio");
    }
  }

/**
 * Obtiene domicilios por id de usuario
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function obtenerDomiciliosDeUsuario(req, res) {
  try {
    const userId = req.params.userId; // ID del usuario
    const domicilios = await UsuarioService.obtenerDomiciliosDeUsuario(userId);

    if (domicilios.length === 0) {
      res.status(204).json({ message: 'El usuario no tiene domicilios asociados' });
    } else {
      res.status(200).json(domicilios);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
}

/**
 * Elimina un domicilio por id de usuario
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function eliminarDomicilioDeUsuario(req, res) {
  try {
    const userId = req.params.userId; // ID del usuario
    const domicilioId = req.params.domicilioId; // ID del domicilio a eliminar

    const usuario = await UsuarioService.eliminarDomicilioDeUsuario(userId, domicilioId);

    if (!usuario) {
      res.status(404).json({ message: 'Usuario no encontrado o domicilio no asociado' });
    } else {
      res.status(204).json({ message: 'Domicilio eliminado del usuario con éxito' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
}

module.exports = {
    createDomicilio,
  obtenerDomiciliosDeUsuario,
  eliminarDomicilioDeUsuario,
};

