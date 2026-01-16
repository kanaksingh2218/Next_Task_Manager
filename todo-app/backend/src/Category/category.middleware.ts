import { Request, Response, NextFunction } from 'express';

export const validateCategory = (req: Request, res: Response, next: NextFunction) => {
    const { name, color } = req.body;

    if (!name || !color) {
        return res.status(400).json({ success: false, message: 'Please provide name and color' });
    }

    next();
};
