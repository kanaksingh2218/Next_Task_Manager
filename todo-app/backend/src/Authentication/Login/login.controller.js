"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = void 0;
const express_1 = require("express");
const User_model_1 = __importDefault(require("../User.model"));
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Check for user
        const user = await User_model_1.default.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
        // Check if password matches
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
        // Return token
        res.status(200).json({
            success: true,
            _id: user._id,
            name: user.name,
            email: user.email,
            token: user.getSignedJwtToken()
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error });
    }
};
exports.loginUser = loginUser;
//# sourceMappingURL=login.controller.js.map