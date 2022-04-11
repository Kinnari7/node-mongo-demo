const express = require('express');
const userRoutes = express.Router();
const userController = require('./userController');

const getUsersMiddleware = [
    userController.getUsersList
];
userRoutes.get('/get-user', getUsersMiddleware);

const addUsersMiddleware = [
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

module.exports = userRoutes;    