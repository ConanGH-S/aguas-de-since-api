import emailConfig from '../config/email.config.js';
import sendError from '../handlers/catch.handler.js';
import envConfig from '../config/env.config.js';

/**
 * Controlador para enviar correos
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {import('express').Response
 * @async
 * @author ConanGH-S
*/
const sendEmail = async (req, res) => {
  const {
    to, subject, information,
  } = req.body;

  const HTMLBODY = `<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px">
  <div style="max-width: 600px; margin: 0 auto; background-color: #fff; border-radius: 8px; padding: 30px; box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1)">
    <h2 style="text-align: center; color: #333">Información de solicitud</h2>
    <p style="text-align: center; color: #333">La persona ${information.name} ha solicitado un nuevo servicio de ${information.services}</p>
    <table style="width: 100%; border-collapse: collapse; margin-top: 20px; border-radius: 8px; overflow: hidden">
      <tr>
        <th style="padding: 10px; border-bottom: 1px solid #ddd; background-color: #f2f2f2; text-align: left">Nombre</th>
        <td style="padding: 10px; border-bottom: 1px solid #ddd">${information.name}</td>
      </tr>
      <tr>
        <th style="padding: 10px; border-bottom: 1px solid #ddd; background-color: #f2f2f2; text-align: left">Apellidos</th>
        <td style="padding: 10px; border-bottom: 1px solid #ddd">${information.lastName}</td>
      </tr>
      <tr>
        <th style="padding: 10px; border-bottom: 1px solid #ddd; background-color: #f2f2f2; text-align: left">Tipo de Documento</th>
        <td style="padding: 10px; border-bottom: 1px solid #ddd">${information.document}</td>
      </tr>
      <tr>
        <th style="padding: 10px; border-bottom: 1px solid #ddd; background-color: #f2f2f2; text-align: left">Número de Documento</th>
        <td style="padding: 10px; border-bottom: 1px solid #ddd">${information.numDocument}</td>
      </tr>
      <tr>
        <th style="padding: 10px; border-bottom: 1px solid #ddd; background-color: #f2f2f2; text-align: left">Número de Celular</th>
        <td style="padding: 10px; border-bottom: 1px solid #ddd">${information.numPhone}</td>
      </tr>
      <tr>
        <th style="padding: 10px; border-bottom: 1px solid #ddd; background-color: #f2f2f2; text-align: left">Número Fijo</th>
        <td style="padding: 10px; border-bottom: 1px solid #ddd">${information.numFijo ?? 'N/A'}</td>
      </tr>
      <tr>
        <th style="padding: 10px; border-bottom: 1px solid #ddd; background-color: #f2f2f2; text-align: left">Servicios</th>
        <td style="padding: 10px; border-bottom: 1px solid #ddd">${information.services}</td>
      </tr>
      <tr>
        <th style="padding: 10px; border-bottom: 1px solid #ddd; background-color: #f2f2f2; text-align: left">Dirección</th>
        <td style="padding: 10px; border-bottom: 1px solid #ddd">${information.address}</td>
      </tr>
      <tr>
        <th style="padding: 10px; border-bottom: 1px solid #ddd; background-color: #f2f2f2; text-align: left">Barrio</th>
        <td style="padding: 10px; border-bottom: 1px solid #ddd">${information.neighborhood}</td>
      </tr>
    </table>
    <div style="display: flex; justify-content: center">
      <img src="https://lh3.googleusercontent.com/u/2/drive-viewer/AEYmBYTIsxz5EkZQ6Su_46EknIaAnn0EGo1lwDu-88HWsuW5YQHcfRhhN_5RbNCWrg3GSsPS8tCcb3rlOW1oblOHvmb8pRCQ8w=w1318-h692" alt="Logo principal de aguas de sincé" style="width: 30%; margin: auto" />
    </div>
  </div>
</body>`;

  try {
    await emailConfig.sendMail({
      from: envConfig.mailUser,
      to,
      subject,
      html: HTMLBODY,
    });
    return res.sendStatus(204);
  } catch ({ message }) {
    return sendError(res, message, 500);
  }
};

export default sendEmail;
