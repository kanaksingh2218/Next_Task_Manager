"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const task_controller_1 = require("./task.controller");
const auth_middleware_1 = require("../Authentication/auth.middleware");
const task_middleware_1 = require("./task.middleware");
const router = express_1.default.Router();
router.use(auth_middleware_1.protect);
router.route('/')
    .get(task_controller_1.getTasks)
    .post(task_middleware_1.validateTask, task_controller_1.createTask);
router.route('/:id')
    .get(task_controller_1.getTaskById)
    .put(task_middleware_1.validateTask, task_controller_1.updateTask)
    .delete(task_controller_1.deleteTask);
router.route('/:id/toggle')
    .patch(task_controller_1.toggleComplete);
exports.default = router;
