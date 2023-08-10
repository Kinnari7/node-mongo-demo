const express = require('express');
const userRoutes = express.Router();
const userController = require('./userController');
const authUser = require('../../../authentication/jwt');
const userValidator = require('./userValidator');

const loginMiddleware = [
    userController.loginUser
];
userRoutes.post('/login', loginMiddleware);

const getUsersMiddleware = [
    authUser.validateJWTToken,
    userController.getUsersList
];
userRoutes.post('/get-user', getUsersMiddleware);

const addUsersMiddleware = [
    authUser.validateJWTToken,
    userValidator.validateAddUser,
    userController.addUsersList
];
userRoutes.post('/add-user', addUsersMiddleware);

const editUsersMiddleware = [
    userController.editUsersList
];
userRoutes.post('/edit-user/:id', editUsersMiddleware);

const deleteUsersMiddleware = [
    userController.deleteUsersList
];
userRoutes.delete('/delete-user/:id', deleteUsersMiddleware);

const getProductsMiddleware = [
    authUser.validateJWTToken,
    userController.getProductsList
];
userRoutes.get('/get-product', getProductsMiddleware);

const uploadImageMiddleware = [
    userController.uploadImage
];
userRoutes.post('/upload-profile', uploadImageMiddleware);

module.exports = userRoutes;    