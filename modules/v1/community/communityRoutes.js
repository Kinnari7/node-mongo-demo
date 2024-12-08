const express = require('express');
const communityRoutes = express.Router();
const communityController = require('./communityController');

// create post
const createPost = [
    communityController.createPost
];
communityRoutes.post('/', createPost);

// delete post
const deletePost = [
    communityController.deletePost
];
communityRoutes.delete('/:id', deletePost);

// get post
const getAllPost = [
    communityController.getAllPost
];
communityRoutes.post('/get-all-community', getAllPost);

module.exports = communityRoutes;   