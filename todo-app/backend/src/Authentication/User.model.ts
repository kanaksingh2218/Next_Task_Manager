import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    matchPassword(enteredPassword: string): Promise<boolean>;
    getSignedJwtToken(): string;
}

const UserSchema: Schema = new Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
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
    }
});

// Encrypt password using bcrypt
UserSchema.pre('save', async function (this: IUser, next: any) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
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

export default mongoose.model<IUser>('User', UserSchema);
