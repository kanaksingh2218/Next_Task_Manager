"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleComplete = exports.deleteTask = exports.updateTask = exports.createTask = exports.getTaskById = exports.getTasks = void 0;
const express_1 = require("express");
const Task_model_1 = __importDefault(require("./Task.model"));
const getTasks = async (req, res) => {
    try {
        const match = {};
        if (req.query.completed) {
            match.completed = req.query.completed === 'true';
        }
        if (req.query.categoryId) {
            match.categoryId = req.query.categoryId;
        }
        const tasks = await Task_model_1.default.find({ userId: req.user._id, ...match })
            .populate('categoryId', 'name color')
            .sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: tasks.length, data: tasks });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error });
    }
};
exports.getTasks = getTasks;
const getTaskById = async (req, res) => {
    try {
        const task = await Task_model_1.default.findOne({ _id: req.params.id, userId: req.user._id });
        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }
        res.status(200).json({ success: true, data: task });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error });
    }
};
exports.getTaskById = getTaskById;
const createTask = async (req, res) => {
    try {
        req.body.userId = req.user._id;
        const task = await Task_model_1.default.create(req.body);
        res.status(201).json({ success: true, data: task });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error });
    }
};
exports.createTask = createTask;
const updateTask = async (req, res) => {
    try {
        let task = await Task_model_1.default.findOne({ _id: req.params.id, userId: req.user._id });
        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }
        task = await Task_model_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({ success: true, data: task });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error });
    }
};
exports.updateTask = updateTask;
const deleteTask = async (req, res) => {
    try {
        const task = await Task_model_1.default.findOne({ _id: req.params.id, userId: req.user._id });
        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }
        await task.deleteOne();
        res.status(200).json({ success: true, data: {} });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error });
    }
};
exports.deleteTask = deleteTask;
const toggleComplete = async (req, res) => {
    try {
        const task = await Task_model_1.default.findOne({ _id: req.params.id, userId: req.user._id });
        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }
        task.completed = !task.completed;
        await task.save();
        res.status(200).json({ success: true, data: task });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error });
    }
};
exports.toggleComplete = toggleComplete;
//# sourceMappingURL=task.controller.js.map