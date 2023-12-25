import crypt from 'bcrypt';

/**
 * Middleware para comprobar si las contraseñas si coinciden con la base de datos.
 * @param {clientPassword: string}
 * @param {serverPassowrd: string}
 * @returns {boolean}
 */
const checkUserPassowrd = async (clientPassword, serverPassowrd) => {
  try {
    const isMatch = await crypt.compare(clientPassword, serverPassowrd);
    return !!isMatch;
  } catch (error) {
    throw new Error('ERROR');
  }
};

export default checkUserPassowrd;
