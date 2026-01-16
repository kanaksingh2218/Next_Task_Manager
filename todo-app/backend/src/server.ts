import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

// Route Imports
import signupRoutes from './Authentication/Signup/signup.routes';
import loginRoutes from './Authentication/Login/login.routes';
import forgotPasswordRoutes from './Authentication/ForgotPassword/forgotPassword.routes';
import taskRoutes from './Task/task.routes';
import categoryRoutes from './Category/category.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/todo-app';

mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', signupRoutes);
app.use('/api/auth', loginRoutes);
app.use('/api/auth', forgotPasswordRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/categories', categoryRoutes);

app.get('/', (req, res) => {
    res.send('Todo App Backend Running');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
