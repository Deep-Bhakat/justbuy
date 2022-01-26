const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { isAuthenticated } = require('../middleware/auth');


router.post('/register',userController.registerUser);
router.post('/login',userController.loginUser);
router.get('/logout',userController.logoutUser);
router.post('/forgotPassword',userController.forgotPassword);
router.post('/resetPassword/:token',userController.resetPassword);
router.get('/me',isAuthenticated ,userController.getUser);
router.put('/changePassword',isAuthenticated ,userController.changePassword);

module.exports = router;