import express from 'express';
import {
    getProduct,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} from '../controllers/Product.Controller';

const router = express.Router();

router.get('/products', getProduct);
router.get('/products/:id', getProductById);
router.post('/products', createProduct);
router.patch('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

export default router;