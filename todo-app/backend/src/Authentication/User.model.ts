import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

export interface IUser extends Document {
    fullName: string;
    email: string;
    password: string;
    createdAt: Date;
    resetPasswordToken?: string;
    resetPasswordExpire?: Date;
    matchPassword(enteredPassword: string): Promise<boolean>;
    getSignedJwtToken(): string;
    getResetPasswordToken(): string;
}

const UserSchema: Schema = new Schema({
    fullName: {
        type: String,
        required: [true, 'Please add a full name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
});

// Encrypt password using bcrypt
UserSchema.pre('save', async function (this: IUser) {
    if (!this.isModified('password')) {
        return;
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword: string): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function (): string {
    const expiresIn: any = process.env.JWT_EXPIRE || '30d';
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET as string, {
        expiresIn
    });
};

// Generate and hash password token
UserSchema.methods.getResetPasswordToken = function (): string {
    // Generate token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash token and set to resetPasswordToken field
    this.resetPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    // Set expire (10 minutes)
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    return resetToken;
};

export default mongoose.model<IUser>('User', UserSchema);
