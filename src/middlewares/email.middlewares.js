import sendError from '../handlers/catch.handler.js';
import emailSchema from '../schemas/email.schemas.js';

/**
 * Función que valida los datos de entrada para enviar un correo electrónico.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @returns {void<import('express').NextFunction>}
 * @author ConanGH-S
 */
const checkEmailPayload = (req, res, next) => {
  const { to, subject, information } = req.body;
  try {
    const result = emailSchema.safeParse({ to, subject, information });
    if (!result.success) throw new Error(`${result.error.errors[0].path[0]} ${result.error.errors[0].message}`);
    return next();
  } catch ({ message }) {
    return sendError(res, message, 404);
  }
};

export default checkEmailPayload;
