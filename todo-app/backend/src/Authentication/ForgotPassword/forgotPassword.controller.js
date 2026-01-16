"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotPassword = void 0;
const express_1 = require("express");
const User_model_1 = __importDefault(require("../User.model"));
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User_model_1.default.findOne({ email });
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
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error });
    }
};
exports.forgotPassword = forgotPassword;
//# sourceMappingURL=forgotPassword.controller.js.map