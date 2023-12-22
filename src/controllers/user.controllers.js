import sendError from '../handlers/catch.handler.js';
import { createToken } from '../lib/token.utils.js';

export const registerUser = (req, res) => res.send({
  register: 'ERROR',
});

/**
 * Función que permite iniciar sesión en el sistema devolviendo un jwt.
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns {import("express").Response}
 * @author ConanGH-S
 */
export const loginUser = (req, res) => {
  const { username, password } = req.body;
  try {
    const token = createToken({ username, password });
    if (token === undefined) throw new Error('Error al crear el token');
    return res.status(202).cookie('user_session', token, {
      httpOnly: true, sameSite: 'strict', expires: new Date(Date.now() + 60 * 60 * 1000), path: '/',
    }).send('Ok.');
  } catch ({ message }) {
    return sendError(res, message, 500);
  }
};
