const express = require('express');
const userRoutes = express.Router();
const userController = require('./userController');
const userMiddleware = require('./userMiddleware');
const authUser = require('../../../authentication/jwt');
const userValidator = require('./userValidator');

// register api
const registerMiddleware = [
    userMiddleware.emailExists,
    userController.registerUser
];
userRoutes.post('/register', registerMiddleware);

// login api
const loginMiddleware = [
    userController.loginUser
];
userRoutes.post('/login', loginMiddleware);

// verify email
const verifyEmailMiddleware = [
    userController.verifyEmail
];
userRoutes.post('/verify-email', verifyEmailMiddleware);

// admin get users list
const getUsersMiddleware = [
    // authUser.validateJWTToken,
    userController.getUsersList
];
userRoutes.post('/admin/get-users', getUsersMiddleware);

// add guest user
const addUsersMiddleware = [
    userController.addGuestUser
];
userRoutes.post('/add-guest-user', addUsersMiddleware);

module.exports = userRoutes;    