import { Request, Response, NextFunction } from 'express';

export const validateForgotPassword = (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ success: false, message: 'Please provide an email' });
    }

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ success: false, message: 'Please provide a valid email' });
    }

    next();
};
