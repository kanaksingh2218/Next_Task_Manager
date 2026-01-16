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
exports.toggleComplete = exports.deleteTask = exports.updateTask = exports.createTask = exports.getTaskById = exports.getTasks = void 0;
const Task_model_1 = __importDefault(require("./Task.model"));
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const match = {};
        if (req.query.completed) {
            match.completed = req.query.completed === 'true';
        }
        if (req.query.categoryId) {
            match.categoryId = req.query.categoryId;
        }
        const tasks = yield Task_model_1.default.find(Object.assign({ userId: req.user._id }, match))
            .populate('categoryId', 'name color')
            .sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: tasks.length, data: tasks });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error });
    }
});
exports.getTasks = getTasks;
const getTaskById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield Task_model_1.default.findOne({ _id: req.params.id, userId: req.user._id });
        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }
        res.status(200).json({ success: true, data: task });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error });
    }
});
exports.getTaskById = getTaskById;
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.body.userId = req.user._id;
        const task = yield Task_model_1.default.create(req.body);
        res.status(201).json({ success: true, data: task });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error });
    }
});
exports.createTask = createTask;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let task = yield Task_model_1.default.findOne({ _id: req.params.id, userId: req.user._id });
        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }
        task = yield Task_model_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({ success: true, data: task });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error });
    }
});
exports.updateTask = updateTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield Task_model_1.default.findOne({ _id: req.params.id, userId: req.user._id });
        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }
        yield task.deleteOne();
        res.status(200).json({ success: true, data: {} });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error });
    }
});
exports.deleteTask = deleteTask;
const toggleComplete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield Task_model_1.default.findOne({ _id: req.params.id, userId: req.user._id });
        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }
        task.completed = !task.completed;
        yield task.save();
        res.status(200).json({ success: true, data: task });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error });
    }
});
exports.toggleComplete = toggleComplete;
