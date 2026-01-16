"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const forgotPassword_controller_1 = require("./forgotPassword.controller");
const forgotPassword_middleware_1 = require("./forgotPassword.middleware");
const router = express_1.default.Router();
router.post('/forgot-password', forgotPassword_middleware_1.validateForgotPassword, forgotPassword_controller_1.forgotPassword);
exports.default = router;
