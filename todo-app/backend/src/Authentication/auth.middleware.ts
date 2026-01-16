import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from './User.model';

// Extend Request interface to include user
declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ success: false, message: 'Not authorized to access this route' });
    }

    try {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
        console.log('Decoded Token:', decoded); // LOGGING

        req.user = await User.findById(decoded.id);

        if (!req.user) {
            console.log('User not found in DB'); // LOGGING
            return res.status(401).json({ success: false, message: 'User not found' });
        }

        next();
    } catch (error) {
        console.error('JWT Verify Error:', error); // LOGGING
        return res.status(401).json({ success: false, message: 'Not authorized to access this route' });
    }
};
