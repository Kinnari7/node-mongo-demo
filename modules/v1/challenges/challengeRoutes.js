const express = require('express');
const challengeRoutes = express.Router();
const challengeController = require('./challengeController');
const authUser = require('../../../authentication/jwt');

// get all challenges
const getChallengesList = [
    // authUser.validateJWTToken,
    challengeController.getChallengesList
];
challengeRoutes.get('/get-challenges', getChallengesList);

// add challenge by admin
const addChallengeMiddleware = [
    // authUser.validateJWTToken,
    challengeController.addChallenge
];
challengeRoutes.post('/admin/add-challenge', addChallengeMiddleware);

// get all challenges
const getGuestChallengeList = [
    challengeController.getGuestChallengeList
];
challengeRoutes.post('/get-guest-challenges', getGuestChallengeList);

module.exports = challengeRoutes;    