const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.post('/register',userController.registerUser);
router.post('/login',userController.loginUser);
router.get('/logout',userController.logoutUser);
router.post('/forgotPassword',userController.forgotPassword);
router.post('/resetPassword/:token',userController.resetPassword);

module.exports = router;