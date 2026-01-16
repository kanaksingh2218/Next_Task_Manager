import { Request, Response } from 'express';
import Category from './Category.model';

export const getCategories = async (req: Request, res: Response) => {
    try {
        const categories = await Category.find({ userId: req.user._id });
        res.status(200).json({ success: true, count: categories.length, data: categories });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error });
    }
};

export const getCategoryById = async (req: Request, res: Response) => {
    try {
        const category = await Category.findOne({ _id: req.params.id, userId: req.user._id });

        if (!category) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }

        res.status(200).json({ success: true, data: category });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error });
    }
};

export const createCategory = async (req: Request, res: Response) => {
    try {
        req.body.userId = req.user._id;

        const category = await Category.create(req.body);

        res.status(201).json({ success: true, data: category });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error });
    }
};

export const updateCategory = async (req: Request, res: Response) => {
    try {
        let category = await Category.findOne({ _id: req.params.id, userId: req.user._id });

        if (!category) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }

        category = await Category.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({ success: true, data: category });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error });
    }
};

export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const category = await Category.findOne({ _id: req.params.id, userId: req.user._id });

        if (!category) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }

        await category.deleteOne();

        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error });
    }
};
