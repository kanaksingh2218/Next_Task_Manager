import { Request, Response } from 'express';
import User from '../User.model';

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { fullName, email, password } = req.body;

        // Check if user exists by email
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({
                success: false,
                message: 'Email already exists'
            });
        }

        // Create user
        const user = await User.create({
            fullName,
            email,
            password
        });

        console.log('User Registered Successfully:', user._id);

        // Send response with token
        res.status(201).json({
            success: true,
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            token: user.getSignedJwtToken()
        });

    } catch (error: any) {
        console.error('Registration Error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Server Error',
            error: process.env.NODE_ENV === 'development' ? error : undefined
        });
    }
};
