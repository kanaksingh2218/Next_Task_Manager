"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const express_1 = require("express");
const User_model_1 = __importDefault(require("../User.model"));
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Check if user exists
        const userExists = await User_model_1.default.findOne({ email });
        if (userExists) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }
        // Create user
        const user = await User_model_1.default.create({
            name,
            email,
            password
        });
        // Send response with token
        res.status(201).json({
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
exports.registerUser = registerUser;
//# sourceMappingURL=signup.controller.js.map