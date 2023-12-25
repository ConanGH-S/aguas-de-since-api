import sendError from '../handlers/catch.handler.js';
import { createToken } from '../lib/token.utils.js';
import User from '../models/user.models.js';

/**
 * Controlador para obtener todos los usuarios de la base de datos.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @async
 * @author ConanGH-S
 */
export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.status(200).send(users);
  } catch ({ message }) {
    return sendError(res, message, 500);
  }
};

export const registerUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    await User.create({ name: username, password, status: 'active' });
    return res.sendStatus(201);
  } catch ({ message }) {
    return sendError(res, message, 500);
  }
};

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
    return res.status(200).cookie('user_session', token, {
      httpOnly: true, sameSite: 'strict', expires: new Date(Date.now() + 60 * 60 * 1000), path: '/',
    }).send('Ok.');
  } catch ({ message }) {
    return sendError(res, message, 500);
  }
};
