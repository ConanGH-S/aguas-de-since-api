import { Router } from 'express';
import emailRouter from './email.routes.js';

const router = Router();

router.get('/v1/test', (_, res) => res.status(202).json('Somebody is watching me!'));

export { router, emailRouter };
