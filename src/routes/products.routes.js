import { Router } from 'express';
import { createProduct, getProducts, getProductById, getProductsByCategory, getProductsBySupermarket, updateProduct, deleteProduct } from '../controllers/product.controller.js';

const router = Router();

router.post('/createProduct', createProduct);
router.get('/getProducts', getProducts);
router.get('/getProductById/:id', getProductById);
router.put('/updateProduct/:id', updateProduct);
router.delete('/deleteProduct/:id', deleteProduct);
router.get('/getproductbycategory/:categoryName', getProductsByCategory);
router.get('/getproductbymarket/:supermarketId', getProductsBySupermarket)

export default router;