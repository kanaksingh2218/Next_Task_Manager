import express from 'express';
import {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    toggleComplete
} from './task.controller';
import { protect } from '../Authentication/auth.middleware';
import { validateTask } from './task.middleware';

const router = express.Router();

router.use(protect);

router.route('/')
    .get(getTasks)
    .post(validateTask, createTask);

router.route('/:id')
    .get(getTaskById)
    .put(validateTask, updateTask)
    .delete(deleteTask);

router.route('/:id/toggle')
    .patch(toggleComplete);

export default router;
