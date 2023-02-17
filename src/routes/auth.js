/* eslint-disable import/extensions */
import { Router } from 'express';
import { AuthMiddleware } from '../middlewares';
import { AuthController } from '../controller';

const router = Router();
const {
  verifySignup,
  verifyLogin,
  authenticate,
} = AuthMiddleware;
const {
  signup,
  login,
  getProfile,
  logoutUser,
} = AuthController;

// define apis
router.post('/signup', verifySignup, signup);
router.post('/login', verifyLogin, login);
router.get('/profile', authenticate, getProfile); // ?email=[]
router.post('/logout', authenticate, logoutUser); // ?email=[]

export default router;
