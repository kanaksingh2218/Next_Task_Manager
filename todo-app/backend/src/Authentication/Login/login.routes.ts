import express from 'express';
import { loginUser, getMe } from './login.controller';
import { validateLogin } from './login.middleware';
import { protect } from '../auth.middleware';

const router = express.Router();

router.post('/login', validateLogin, loginUser);
router.get('/me', protect, getMe);

export default router;
