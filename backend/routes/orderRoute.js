const express = require('express');
const orderController = require('../controllers/orderController');
const { isAuthenticated, authorizeRole } = require('../middleware/auth');

const router = express.Router();

router.post('/order/new', isAuthenticated, orderController.createOrder);
router.get('/order/:orderId', isAuthenticated, orderController.getOrder);
router.get('/orders', isAuthenticated, orderController.myOrders);
router.get('/admin/orders', isAuthenticated, authorizeRole('admin'), orderController.allOrders);
router.put('/admin/order/:orderId', isAuthenticated, authorizeRole('admin'), orderController.updateOrder);
router.delete('/admin/order/:orderId', isAuthenticated, authorizeRole('admin'), orderController.deleteOrder);

module.exports = router;