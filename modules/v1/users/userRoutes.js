const express = require('express');
const userRoutes = express.Router();
const userController = require('./userController');

const getUsersMiddleware = [
    userController.getUsersList
];
userRoute.post('/get-user', getUsersMiddleware);

module.exports = userRoutes;