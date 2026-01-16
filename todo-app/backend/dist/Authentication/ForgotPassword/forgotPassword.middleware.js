"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateForgotPassword = void 0;
const validateForgotPassword = (req, res, next) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ success: false, message: 'Please provide an email' });
    }
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ success: false, message: 'Please provide a valid email' });
    }
    next();
};
exports.validateForgotPassword = validateForgotPassword;
