import { Request, Response } from 'express';
import User from '../User.model';

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        // Check if user exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        // Create user
        const user = await User.create({
            name,
            email,
            password
        });

        console.log('User Registered:', user); // LOGGING

        // Send response with token
        res.status(201).json({
            success: true,
            _id: user._id,
            name: user.name,
            email: user.email,
            token: user.getSignedJwtToken()
        });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error });
    }
};
