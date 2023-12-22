import { Router } from 'express';
import { checkLoginData } from '../middlewares/user.middlewares.js';
import { loginUser, registerUser } from '../controllers/user.controllers.js';

const userRouter = Router();

userRouter.post('/v1/user/register', registerUser);

userRouter.post('/v1/user/login', checkLoginData, loginUser);

export default userRouter;
