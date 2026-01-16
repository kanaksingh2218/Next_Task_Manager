"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTask = void 0;
const express_1 = require("express");
const validateTask = (req, res, next) => {
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ success: false, message: 'Please provide a title' });
    }
    next();
};
exports.validateTask = validateTask;
//# sourceMappingURL=task.middleware.js.map