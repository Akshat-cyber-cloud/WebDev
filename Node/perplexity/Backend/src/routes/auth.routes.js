import {Router} from 'express';
import {register , verifyEmail, login, getMe, logout} from '../controllers/auth.controller.js';
import { registerValidator } from '../validators/auth.validator.js';
import { loginValidator } from '../validators/auth.validator.js';
import { authUser } from '../middleware/auth.middleware.js';

const authRouter = Router();

authRouter.post("/register", registerValidator, register);

authRouter.post("/login",loginValidator,login);

authRouter.get('/get-me',authUser,getMe);

authRouter.get('/logout', logout);

authRouter.get('/verify-email',verifyEmail)

export default authRouter;