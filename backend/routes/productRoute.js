const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();

router.get('/products', productController.getProducts);
router.get('/product/:prodId', productController.getProduct);
router.put('/admin/product/:prodId', productController.updateProduct);
router.post('/admin/product/new', productController.createProduct);
router.delete('/admin/product/:prodId', productController.deleteProduct);

module.exports = router;