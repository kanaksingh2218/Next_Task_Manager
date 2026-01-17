"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getCategoryById = exports.getCategories = void 0;
const express_1 = require("express");
const Category_model_1 = __importDefault(require("./Category.model"));
const getCategories = async (req, res) => {
    try {
        const categories = await Category_model_1.default.find({ userId: req.user._id });
        res.status(200).json({ success: true, count: categories.length, data: categories });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error });
    }
};
exports.getCategories = getCategories;
const getCategoryById = async (req, res) => {
    try {
        const category = await Category_model_1.default.findOne({ _id: req.params.id, userId: req.user._id });
        if (!category) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }
        res.status(200).json({ success: true, daa: category });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error });
    }
};
exports.getCategoryById = getCategoryById;
const createCategory = async (req, res) => {
    try {
        req.body.userId = req.user._id;
        const category = await Category_model_1.default.create(req.body);
        res.status(201).json({ success: true, data: category });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error });
    }
};
exports.createCategory = createCategory;
const updateCategory = async (req, res) => {
    try {
        let category = await Category_model_1.default.findOne({ _id: req.params.id, userId: req.user._id });
        if (!category) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }
        category = await Category_model_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({ success: true, data: category });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error });
    }
};
exports.updateCategory = updateCategory;
const deleteCategory = async (req, res) => {
    try {
        const category = await Category_model_1.default.findOne({ _id: req.params.id, userId: req.user._id });
        if (!category) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }
        await category.deleteOne();
        res.status(200).json({ success: true, data: {} });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error });
    }
};
exports.deleteCategory = deleteCategory;
//# sourceMappingURL=category.controller.js.map