import sendError from '../handlers/catch.handler.js';
import { loginSchema } from '../schemas/user.schemas.js';

export const registerUser = () => ({
  register: false,
});

/**
 * Middleware que verifica si todo está correcto
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 * @returns {Promise<void>}
 * @author ConanGH-S
 */
export const checkLoginData = (req, res, next) => {
  const { username, password } = req.body;
  try {
    const result = loginSchema.safeParse({ username, password });
    if (!result.success) throw new Error('Datos inválidos');
    return next();
  } catch ({ message }) {
    return sendError(res, message, 400);
  }
};
