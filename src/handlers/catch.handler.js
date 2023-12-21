/**
 * Middleware para enviar una respuesta negativa al usuario
 * @param {Response} res
 * @param {string} msg
 * @param {number} status
 * @returns {Response}
 * @author ConanGH-S
 */
const sendError = (res, msg = 'ERROR', status = 404) => res.status(status).json(msg);

export default sendError;
