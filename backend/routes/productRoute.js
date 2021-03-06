const express = require('express');
const productController = require('../controllers/productController');
const {isAuthenticated, authorizeRole } = require('../middleware/auth');
const router = express.Router();

router.get('/products', productController.getProducts);
router.get('/product/:prodId', productController.getProduct);
router.put('/admin/product/:prodId',isAuthenticated, authorizeRole('admin'), productController.updateProduct);
router.post('/admin/product/new', isAuthenticated,  authorizeRole('admin'), productController.createProduct);
router.delete('/admin/product/:prodId', isAuthenticated,  authorizeRole('admin'), productController.deleteProduct);
router.put('/review', isAuthenticated, productController.createProductReview);
router.get('/reviews', isAuthenticated, productController.getProductReviews);
router.delete('/reviews', isAuthenticated, productController.deleteProductReview);

module.exports = router;