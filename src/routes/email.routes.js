import { Router } from 'express';
import sendEmail from '../controllers/email.controllers.js';
import checkEmailPayload from '../middlewares/email.middlewares.js';

const emailRouter = Router();

/**
 * Ruta para enviar un correo electrónico.
 * @author ConanGH-S
 * @returns {Promise<import('express').Response>}
 * @async
 */
emailRouter.post('/v1/email', checkEmailPayload, sendEmail);

export default emailRouter;
