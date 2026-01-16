import express from 'express';
import {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
} from './category.controller';
import { protect } from '../Authentication/auth.middleware';
import { validateCategory } from './category.middleware';

const router = express.Router();

router.use(protect); // Protect all routes

router.route('/')
    .get(getCategories)
    .post(validateCategory, createCategory);

router.route('/:id')
    .get(getCategoryById)
    .put(validateCategory, updateCategory)
    .delete(deleteCategory);

export default router;
