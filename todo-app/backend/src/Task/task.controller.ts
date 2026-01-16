import { Request, Response } from 'express';
import Task from './Task.model';

export const getTasks = async (req: Request, res: Response) => {
    try {
        const match: any = {};
        if (req.query.completed) {
            match.completed = req.query.completed === 'true';
        }
        if (req.query.categoryId) {
            match.categoryId = req.query.categoryId;
        }

        const tasks = await Task.find({ userId: req.user._id, ...match })
            .populate('categoryId', 'name color')
            .sort({ createdAt: -1 });

        res.status(200).json({ success: true, count: tasks.length, data: tasks });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error });
    }
};

export const getTaskById = async (req: Request, res: Response) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, userId: req.user._id });

        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }

        res.status(200).json({ success: true, data: task });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error });
    }
};

export const createTask = async (req: Request, res: Response) => {
    try {
        console.log('Create Task Request Body:', req.body); // LOGGING
        req.body.userId = req.user._id;

        if (!req.body.categoryId) {
            delete req.body.categoryId;
        }
        if (!req.body.dueDate) {
            delete req.body.dueDate;
        }

        console.log('Processed Task Body:', req.body); // LOGGING

        const task = await Task.create(req.body);

        res.status(201).json({ success: true, data: task });
    } catch (error) {
        console.error('Create Task Error:', error); // LOGGING
        res.status(500).json({ success: false, message: 'Server Error', error });
    }
};

export const updateTask = async (req: Request, res: Response) => {
    try {
        let task = await Task.findOne({ _id: req.params.id, userId: req.user._id });

        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }

        if (req.body.categoryId === '') {
            delete req.body.categoryId;
            // If we want to unset the category, we might need $unset, but for now assuming delete key means "don't update it to empty string"
            // Actually, if user wants to remove category, we accept null? 
            // The schema says categoryId is ObjectId. Empty string fails. 
            // Let's just strip empty strings.
        }
        if (!req.body.categoryId) delete req.body.categoryId;
        if (!req.body.dueDate) delete req.body.dueDate;

        task = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({ success: true, data: task });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error });
    }
};

export const deleteTask = async (req: Request, res: Response) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, userId: req.user._id });

        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }

        await task.deleteOne();

        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error });
    }
};

export const toggleComplete = async (req: Request, res: Response) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, userId: req.user._id });

        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }

        task.completed = !task.completed;
        await task.save();

        res.status(200).json({ success: true, data: task });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error });
    }
};
