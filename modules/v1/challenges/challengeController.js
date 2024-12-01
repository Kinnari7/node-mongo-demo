const challengeController = {};
const { size } = require('lodash');
const challengeService = require('./challengeService');

challengeController.getChallengesList = async (req, res) => {
    try {
        let response = await challengeService.getChallengesList();
        await res.send({
            msg: 'All Challenges',
            data: {
                dayHike: response
            },
            status: 200,
            success: true
        });
    } catch (e) {
        return res.send({
            msg: 'Error',
            data: e
        });
    }
};

challengeController.addChallenge = async (req, res) => {
    try {
        let response = await challengeService.addChallenge(req.body);
        if (size(response) > 0) {
            await challengeService.addChallengeColor(response.id, req.body);
            await res.send({
                msg: 'Challenge Added',
                data: response
            });
        }
    } catch (e) {
        return res.send({
            msg: 'Error',
            data: e
        });
    }
};

challengeController.getGuestChallengeList = async (req, res) => {
    try {
        const guestDetails = await challengeService.getGuestChallengeList(req.body);
        const response = {
            ...guestDetails.toObject(),
            savedGuestUser: {
                id: guestDetails?.id,
                challenges: []
            }
        };
        await res.send({
            msg: 'Welcome! Guest User',
            data: response
        });
    } catch (e) {
        return res.send({
            msg: 'Error',
            data: e
        });
    }
};

module.exports = challengeController;