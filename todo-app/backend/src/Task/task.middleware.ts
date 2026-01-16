import { Request, Response, NextFunction } from 'express';

export const validateTask = (req: Request, res: Response, next: NextFunction) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ success: false, message: 'Please provide a title' });
    }

    next();
};
