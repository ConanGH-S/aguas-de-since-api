import crypt from 'bcrypt';
import sendError from '../handlers/catch.handler.js';
import { loginSchema } from '../schemas/user.schemas.js';
import User from '../models/user.models.js';
import getPasswordByUsername from '../lib/user.utils.js';
import checkUserPassowrd from '../lib/hash.utils.js';

const possibleRoutes = {
  register: '/v1/users/register',
  login: '/v1/users/login',
};

/**
 * Middleware que encripta la contraseña del usuario antes de guardarla en la base de datos.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @returns
 */
export const hashPassword = (req, res, next) => {
  const { password } = req.body;
  const saltRounds = 10;
  try {
    const generatedSalt = crypt.genSaltSync(saltRounds);
    const passwordHash = crypt.hashSync(password, generatedSalt);
    if (!passwordHash) throw new Error('Error al encriptar la contraseña');
    req.body.password = passwordHash;
    return next();
  } catch ({ message }) {
    return sendError(res, message, 500);
  }
};

export const checkUserExists = async (req, res, next) => {
  const { username } = req.body;
  try {
    const project = await User.findOne({ where: { name: username } });
    if (project && req.path === possibleRoutes.register) throw new Error('El usuario ya existe');
    if (!project && req.path === possibleRoutes.login) throw new Error('El usuario no existe');
    return next();
  } catch ({ message }) {
    return sendError(res, message, 409);
  }
};

/**
 * Middleware que verifica si todo está correcto
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 * @returns {import('express').NextFunction}
 * @async
 * @author ConanGH-S
 */
export const checkUserData = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const result = loginSchema.safeParse({ username, password });
    if (!result.success) throw new Error('Datos inválidos');
    if (req.path === possibleRoutes.login) {
      const serverPassword = await getPasswordByUsername(username);
      const isMatch = await checkUserPassowrd(password, serverPassword);
      if (!isMatch) throw new Error('Datos inválidos');
    }
    return next();
  } catch ({ message }) {
    return sendError(res, message, 400);
  }
};
