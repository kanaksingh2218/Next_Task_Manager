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
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getCategoryById = exports.getCategories = void 0;
const Category_model_1 = __importDefault(require("./Category.model"));
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield Category_model_1.default.find({ userId: req.user._id });
        res.status(200).json({ success: true, count: categories.length, data: categories });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error });
    }
});
exports.getCategories = getCategories;
const getCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield Category_model_1.default.findOne({ _id: req.params.id, userId: req.user._id });
        if (!category) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }
        res.status(200).json({ success: true, daa: category });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error });
    }
});
exports.getCategoryById = getCategoryById;
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.body.userId = req.user._id;
        const category = yield Category_model_1.default.create(req.body);
        res.status(201).json({ success: true, data: category });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error });
    }
});
exports.createCategory = createCategory;
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let category = yield Category_model_1.default.findOne({ _id: req.params.id, userId: req.user._id });
        if (!category) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }
        category = yield Category_model_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({ success: true, data: category });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error });
    }
});
exports.updateCategory = updateCategory;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield Category_model_1.default.findOne({ _id: req.params.id, userId: req.user._id });
        if (!category) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }
        yield category.deleteOne();
        res.status(200).json({ success: true, data: {} });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error });
    }
});
exports.deleteCategory = deleteCategory;
