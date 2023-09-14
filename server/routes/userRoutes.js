const express = require('express');
const userController = require('../controller/userController');
const authController = require('../controller/authController');




const router = express.Router();


//Get all users without authentication
router.get('/', userController.getAllUsers);


//WITH AUTHENTICATION

//signup and login routes
router.post('/signup', authController.signup);
router.post('/login', authController.login);


//getting current user
router.get('/me', authController.protect, userController.getMe, userController.getUser);


//Forgot, Reset, and Updating password
router.post('/forgot-password', authController.forgotPassword);
router.patch('/reset-password/:token', authController.resetPassword);
router.patch('/update-password', authController.protect, authController.updatePassword);


//Update and Delete current User
router.patch('/update-current-user', authController.protect, userController.updateMe);
router.delete('/delete-currect-user', authController.protect, userController.deleteMe);


//Creating user with Admin role
router.post('/create-admin-user', authController.protect, authController.restrictTo('admin'), userController.createUser);


//Updating other user using Admin role
router
    .route('/:id')
    .patch(authController.protect, authController.restrictTo('admin'), userController.updateUser)
    .delete(authController.protect, authController.restrictTo('admin'), userController.deleteUser)



//Exporting user route
module.exports = router