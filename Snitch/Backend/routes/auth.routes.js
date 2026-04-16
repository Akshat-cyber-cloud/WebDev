import {Router} from 'express';
import { registerValidation } from '../validator/auth.validator.js';
const router = Router();

router.post('/register', registerValidation )

export default router;