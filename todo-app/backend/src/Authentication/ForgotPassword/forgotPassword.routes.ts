import express from 'express';
import { forgotPassword, resetPassword, broadcastResetLinks } from './forgotPassword.controller';
import { validateForgotPassword } from './forgotPassword.middleware';

const router = express.Router();

router.post('/forgot-password', validateForgotPassword, forgotPassword);
router.put('/reset-password/:resetToken', resetPassword);
router.post('/broadcast-reset', broadcastResetLinks);

export default router;
