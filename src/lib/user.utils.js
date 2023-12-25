import User from '../models/user.models.js';

/**
 * Middleware para traer la contraseña del usuario para ser usable
 * @param {string} username
 * @returns {string} password
 * @async
 */
const getPasswordByUsername = async (username) => {
  try {
    const { password } = await User.findOne({ username });
    return password;
  } catch (error) {
    throw new Error('ERROR');
  }
};

export default getPasswordByUsername;
