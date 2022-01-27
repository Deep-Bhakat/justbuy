const express = require('express');
const orderController = require('../controllers/orderController');
const { isAuthenticated, authorizeRole } = require('../middleware/auth');

const router = express.Router();

router.post('/order/new', isAuthenticated, orderController.createOrder);
router.get('/order/:orderId', isAuthenticated, orderController.getOrder);
router.get('/orders', isAuthenticated, orderController.myOrders);
router.get('/admin/orders', isAuthenticated, authorizeRole('admin'), orderController.allOrders);

module.exports = router;