import { Router } from 'express';
import { checkUserData, checkUserExists, hashPassword } from '../middlewares/user.middlewares.js';
import { getUsers, loginUser, registerUser } from '../controllers/user.controllers.js';

const userRouter = Router();

userRouter.get('/v1/users', getUsers);

userRouter.post('/v1/users/register', checkUserExists, checkUserData, hashPassword, registerUser);

userRouter.post('/v1/users/login', checkUserExists, checkUserData, loginUser);

export default userRouter;
