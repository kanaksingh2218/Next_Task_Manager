"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSignup = void 0;
const validateSignup = (req, res, next) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: 'Please provide name, email and password' });
    }
    // Basic email validation
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ success: false, message: 'Please provide a valid email' });
    }
    if (password.length < 6) {
        return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
    }
    next();
};
exports.validateSignup = validateSignup;
