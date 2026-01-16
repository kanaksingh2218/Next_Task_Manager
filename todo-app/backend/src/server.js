"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
// Route Imports
const signup_routes_1 = __importDefault(require("./Authentication/Signup/signup.routes"));
const login_routes_1 = __importDefault(require("./Authentication/Login/login.routes"));
const forgotPassword_routes_1 = __importDefault(require("./Authentication/ForgotPassword/forgotPassword.routes"));
const task_routes_1 = __importDefault(require("./Task/task.routes"));
const category_routes_1 = __importDefault(require("./Category/category.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Database Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/todo-app';
mongoose_1.default.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));
// Routes
app.use('/api/auth', signup_routes_1.default);
app.use('/api/auth', login_routes_1.default);
app.use('/api/auth', forgotPassword_routes_1.default);
app.use('/api/tasks', task_routes_1.default);
app.use('/api/categories', category_routes_1.default);
app.get('/', (req, res) => {
    res.send('Todo App Backend Running');
});
// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
//# sourceMappingURL=server.js.map