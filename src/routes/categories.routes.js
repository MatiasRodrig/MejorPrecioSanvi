import { Router } from "express";
import * as categoryController from '../controllers/categories.controller.js'

const router = Router();

router.get('/getcategories', categoryController.getCategories);

router.get('/getcategory/:id', categoryController.getCategoryById);

router.post('/createcategory', categoryController.createCategory);

router.put('/updatecategory/:id', categoryController.updateCategoryById);

router.delete('/deletecategory/:id', categoryController.deleteCategoryById);

export default router