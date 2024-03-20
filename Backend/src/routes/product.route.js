import express from 'express';
import productContronller from '../controllers/product.contronller.js';

const router = express.Router();

router.post('/create', productContronller.createProduct);

router.get('/show/:id', productContronller.showDetail);
router.get('/', productContronller.getProducts);

router.delete('/delete/:id', productContronller.deleteProduct);

router.put('/:id', productContronller.updateProduct);

export default router;
