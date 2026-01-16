"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("./category.controller");
const auth_middleware_1 = require("../Authentication/auth.middleware");
const category_middleware_1 = require("./category.middleware");
const router = express_1.default.Router();
router.use(auth_middleware_1.protect); // Protect all routes
router.route('/')
    .get(category_controller_1.getCategories)
    .post(category_middleware_1.validateCategory, category_controller_1.createCategory);
router.route('/:id')
    .get(category_controller_1.getCategoryById)
    .put(category_middleware_1.validateCategory, category_controller_1.updateCategory)
    .delete(category_controller_1.deleteCategory);
exports.default = router;
//# sourceMappingURL=category.routes.js.map