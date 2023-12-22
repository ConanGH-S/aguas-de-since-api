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
    to, subject, information,
  } = req.body;

  const HTMLBODY = `<body style="margin: 15rem">
  <h1 style="text-align: center; font-size: 2rem; margin-bottom: 2rem">Información de nueva solicitud</h1>
  <p style="font-size: 1.5rem; margin-bottom: 1rem">La persona ${information.name} ha solicitado un nuevo servicio de ${information.services},</p>
  <table style="border-collapse: collapse; width: 100%; border-radius: 8px; overflow: hidden">
    <thead>
      <tr style="background-color: #f0f0f0">
        <th style="border: 1px solid #ccc; padding: 8px">Nombre/s</th>
        <th style="border: 1px solid #ccc; padding: 8px">Apellidos</th>
        <th style="border: 1px solid #ccc; padding: 8px">Tipo de Documento.</th>
        <th style="border: 1px solid #ccc; padding: 8px">Nº de Documento.</th>
        <th style="border: 1px solid #ccc; padding: 8px">Nº de Celular</th>
        <th style="border: 1px solid #ccc; padding: 8px">Teléfono Fijo</th>
        <th style="border: 1px solid #ccc; padding: 8px">Servicios</th>
        <th style="border: 1px solid #ccc; padding: 8px">Dirección</th>
        <th style="border: 1px solid #ccc; padding: 8px">Barrio</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="border: 1px solid #ccc; padding: 8px">${information.name}</td>
        <td style="border: 1px solid #ccc; padding: 8px">${information.lastName}</td>
        <td style="border: 1px solid #ccc; padding: 8px">${information.document}</td>
        <td style="border: 1px solid #ccc; padding: 8px">${information.numDocument}</td>
        <td style="border: 1px solid #ccc; padding: 8px">${information.numPhone}</td>
        <td style="border: 1px solid #ccc; padding: 8px">${information.numFijo ?? 'N/A'}</td>
        <td style="border: 1px solid #ccc; padding: 8px">${information.services}</td>
        <td style="border: 1px solid #ccc; padding: 8px">${information.address}</td>
        <td style="border: 1px solid #ccc; padding: 8px">${information.neighborhood}</td>
      </tr>
    </tbody>
  </table>
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
