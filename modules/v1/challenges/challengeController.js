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
            message: 'Error',
            status: 200,
	        success: false
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

challengeController.getChallenge = async (req, res) => {
    try {
        let response = await challengeService.getChallenge(req.body);
        await res.send({
            msg: 'Find Challenge',
            data: {
                // need discuss this
                // bestTime: {
                //         _id:
                //         duration:
                // }
                challenge: response
            },
            status: 200,
            success: true
        });
    } catch (e) {
        return res.send({
            message: 'Error',
            status: 200,
            success: false
        });
    }
};

challengeController.fetchLeaderboard = async (req, res) => {
    try {
        let allHikes = await challengeService.getLeaderBoardData(req.body);
        let colorGradient = await challengeService.getColorGradientForLB(req.body);
        await res.send({
            msg: 'Leader Board',
            data: {
                ColorGradient: colorGradient,
                hikes: allHikes
            },
            status: 200,
            success: true
        });
    } catch (e) {
        return res.send({
            message: 'Error',
            status: 200,
            success: false
        });
    }
};

challengeController.updateChallenge = async (req, res) => {
    try {
        let response = await challengeService.updateChallenge(req.body);
        if (size(response) > 0) {
            await res.send({
                msg: 'Challenge Added',
                data: {
                    myHike: response,
                    newHikeId: '',
                    redeemCode: ''
                },
                status: 200,
	            success: true
            });
        }
    } catch (e) {
        return res.send({
            message: 'Error',
            status: 200,
	        success: false
        });
    }
};

challengeController.deleteChallenge = async (req, res) => {
    try {
        let response = await challengeService.deleteChallenge(req.body);
        if (size(response) > 0) {
            await res.send({
                msg: 'Hike deleted successfully',
                data: response,
                status: 200,
	            success: true

            });
        }
    } catch (e) {
        return res.send({
            message: 'Error',
            status: 200,
	        success: false
        });
    }
};

module.exports = challengeController;