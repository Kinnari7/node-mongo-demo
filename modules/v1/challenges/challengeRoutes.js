const express = require('express');
const challengeRoutes = express.Router();
const challengeController = require('./challengeController');
const authUser = require('../../../authentication/jwt');

// get all challenges
const getChallengesList = [
    // authUser.validateJWTToken,
    challengeController.getChallengesList
];
challengeRoutes.post('/get-challenges', getChallengesList);

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

// get challenge
const getChallenge = [
    challengeController.getChallenge
];
challengeRoutes.post('/findChallenge', getChallenge);

// fetch leaderboard
const fetchLeaderboard = [
    challengeController.fetchLeaderboard
];
challengeRoutes.post('/leaderboard', fetchLeaderboard);

// save challenge
const saveChallenge = [
    challengeController.saveChallenge
];
challengeRoutes.post('/myHikes', saveChallenge);

// update challenge
const updateChallenge = [
    challengeController.updateChallenge
];
challengeRoutes.post('/updateHike', updateChallenge);

// delete challenge
const deleteChallenge = [
    challengeController.deleteChallenge
];
challengeRoutes.post('/deleteHike', deleteChallenge);

module.exports = challengeRoutes;    