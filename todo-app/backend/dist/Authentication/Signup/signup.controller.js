"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const User_model_1 = __importDefault(require("../User.model"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        // Check if user exists
        const userExists = yield User_model_1.default.findOne({ email });
        if (userExists) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }
        // Create user
        const user = yield User_model_1.default.create({
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
});
exports.registerUser = registerUser;
