"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const signup_controller_1 = require("./signup.controller");
const signup_middleware_1 = require("./signup.middleware");
const router = express_1.default.Router();
router.post('/signup', signup_middleware_1.validateSignup, signup_controller_1.registerUser);
exports.default = router;
//# sourceMappingURL=signup.routes.js.map