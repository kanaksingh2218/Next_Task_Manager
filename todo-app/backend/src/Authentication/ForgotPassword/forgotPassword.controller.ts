import { Request, Response } from 'express';
import User from '../User.model';
import crypto from 'crypto';
import sendEmail from '../../utils/sendEmail';

export const forgotPassword = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });

        // Always return success for security (don't reveal if email exists)
        // But only generate token for existing users
        if (user) {
            // Generate reset token
            const resetToken = user.getResetPasswordToken();

            await user.save({ validateBeforeSave: false });

            // Create reset URL
            const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;

            const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please use the following link to reset your password: \n\n ${resetUrl}`;

            const html = `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                    <h2 style="color: #2563eb; text-align: center;">TaskFlow Password Reset</h2>
                    <p>Hello,</p>
                    <p>You are receiving this email because you (or someone else) requested a password reset for your account.</p>
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${resetUrl}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Reset Password</a>
                    </div>
                    <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
                    <p>This link will expire in 10 minutes.</p>
                    <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
                    <p style="font-size: 12px; color: #777; text-align: center;">TaskFlow - Your Personal Task Manager</p>
                </div>
            `;

            try {
                console.log(`Attempting to send email to: ${user.email}...`);
                await sendEmail({
                    email: user.email,
                    subject: 'TaskFlow Password Reset Request',
                    message,
                    html
                });

                console.log('--------------------------------------------------');
                console.log(`Email successfully sent to: ${user.email}`);
                console.log('--------------------------------------------------');
            } catch (err) {
                console.error('Email failed to send:', err);
                user.resetPasswordToken = undefined;
                user.resetPasswordExpire = undefined;

                await user.save({ validateBeforeSave: false });

                return res.status(500).json({ success: false, message: 'Email could not be sent. Please check SMTP configuration.' });
            }
        } else {
            console.log('--------------------------------------------------');
            console.log(`Password reset requested for non-existent email: ${email}`);
            console.log('--------------------------------------------------');
        }

        // Always return the same message for security
        res.status(200).json({
            success: true,
            message: 'If an account exists with this email, you will receive a password reset link.'
        });
    } catch (error: any) {
        console.error('Forgot Password Error:', error);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

export const resetPassword = async (req: Request, res: Response) => {
    try {
        // Get hashed token
        const resetPasswordToken = crypto
            .createHash('sha256')
            .update(req.params.resetToken as string)
            .digest('hex');

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid or expired reset token' });
        }

        // Set new password
        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(200).json({
            success: true,
            message: 'Password reset successful',
            token: user.getSignedJwtToken()
        });
    } catch (error: any) {
        console.error('Reset Password Error:', error);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

export const broadcastResetLinks = async (req: Request, res: Response) => {
    try {
        const users = await User.find({});
        const results = {
            total: users.length,
            success: 0,
            failed: 0,
            errors: [] as string[]
        };

        for (const user of users) {
            try {
                const resetToken = user.getResetPasswordToken();
                await user.save({ validateBeforeSave: false });

                const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
                const message = `You are receiving this email because we are performing a system-wide security update. Please reset your password at: \n\n ${resetUrl}`;
                const html = `
                    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                        <h2 style="color: #2563eb; text-align: center;">Security Update: Reset Required</h2>
                        <p>Hello,</p>
                        <p>We are performing a system-wide security update and require all users to reset their password.</p>
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="${resetUrl}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Reset Password Now</a>
                        </div>
                        <p>If you have any questions, please contact our support team.</p>
                        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
                        <p style="font-size: 12px; color: #777; text-align: center;">TaskFlow - Your Personal Task Manager</p>
                    </div>
                `;

                await sendEmail({
                    email: user.email,
                    subject: 'System Security Update: Password Reset Required',
                    message,
                    html
                });

                results.success++;
                console.log(`Broadcast success: ${user.email}`);
            } catch (err: any) {
                results.failed++;
                results.errors.push(`${user.email}: ${err.message}`);
                console.error(`Broadcast failed: ${user.email}`, err);
            }
        }

        res.status(200).json({
            success: true,
            data: results,
            message: `Broadcast complete. Success: ${results.success}, Failed: ${results.failed}`
        });
    } catch (error: any) {
        console.error('Broadcast Error:', error);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};
