"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCategory = void 0;
const validateCategory = (req, res, next) => {
    const { name, color } = req.body;
    if (!name || !color) {
        return res.status(400).json({ success: false, message: 'Please provide name and color' });
    }
    next();
};
exports.validateCategory = validateCategory;
