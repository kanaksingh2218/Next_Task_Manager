import express from 'express';
import { forgotPassword } from './forgotPassword.controller';
import { validateForgotPassword } from './forgotPassword.middleware';

const router = express.Router();

router.post('/forgot-password', validateForgotPassword, forgotPassword);

export default router;
