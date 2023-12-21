import emailConfig from '../config/email.config.js';
import sendError from '../handlers/catch.handler.js';
import envConfig from '../config/env.config.js';

/**
 * Controlador para enviar correos
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {import('express').Response}
 * @async
 * @author ConanGH-S
*/
const sendEmail = async (req, res) => {
  const {
    to, subject, text,
  } = req.body;

  try {
    await emailConfig.sendMail({
      from: envConfig.mailUser,
      to,
      subject,
      text,
    });
    return res.sendStatus(204);
  } catch ({ message }) {
    return sendError(res, message, 500);
  }
};

export default sendEmail;
