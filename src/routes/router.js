import { Router } from 'express';
import emailRouter from './email.routes.js';
import userRouter from './user.routes.js';

const router = Router();

router.get('/v1/tests', (_, res) => res.status(202).json('Somebody is watching me!'));

export { router, emailRouter, userRouter };
