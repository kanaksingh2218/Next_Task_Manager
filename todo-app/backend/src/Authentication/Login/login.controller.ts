import { Request, Response } from 'express';
import User from '../User.model';

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        console.log('Login Request:', { email, password }); // LOGGING

        // Check for user
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // Check if password matches
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // Return token
        const responseData = {
            success: true,
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            token: user.getSignedJwtToken()
        };
        console.log('Login Response:', responseData); // LOGGING

        res.status(200).json(responseData);

    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error });
    }
};

export const getMe = async (req: Request, res: Response) => {
    try {
        const user = (req as any).user;
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error });
    }
};
