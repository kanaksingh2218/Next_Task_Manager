"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const login_controller_1 = require("./login.controller");
const login_middleware_1 = require("./login.middleware");
const router = express_1.default.Router();
router.post('/login', login_middleware_1.validateLogin, login_controller_1.loginUser);
exports.default = router;
//# sourceMappingURL=login.routes.js.map