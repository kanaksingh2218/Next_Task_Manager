import express from 'express';
import { registerUser } from './signup.controller';
import { validateSignup } from './signup.middleware';

const router = express.Router();

router.post('/signup', validateSignup, registerUser);

export default router;
