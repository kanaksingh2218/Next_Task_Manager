import { Request, Response } from 'express';
import User from '../User.model';

export const forgotPassword = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // In a real app, generate reset token and send email
        // For now, we just acknowledge the request
        console.log(`Reset password requested for: ${email}`);

        res.status(200).json({
            success: true,
            data: 'Email sent'
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error });
    }
};
