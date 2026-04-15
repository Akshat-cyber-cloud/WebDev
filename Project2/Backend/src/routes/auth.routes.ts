import express from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
  getMe,
  googleCallback,
} from '../controllers/auth.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import passport from 'passport';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/me', protect, getMe);

// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], session: false }));
router.get('/google/callback', passport.authenticate('google', { session: false, failureRedirect: '/login' }), googleCallback);

export default router;

