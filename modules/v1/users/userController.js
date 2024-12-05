const userController = {};
const { size } = require('lodash');
const userService = require('./userService');
const authUser = require('../../../authentication/jwt');
const uploadImage = require('../../../uploadImage');

userController.loginUser = async (req, res) => {
    try {
        let response = await userService.authUser(req.body);
        if (size(response) > 0) {
            if (response?.isVerified && !response?.isAdmin) {
                const locations = await userService.addUserLocation(req.body, response.id);
                const preferences = await userService.addUserPreference(req.body, response.id);
                const token = await authUser.createJWTToken({ id: response.id });
                response.accessToken = token;
                const updatedResponse = {
                    accessToken: token,
                    user: {
                        id: response?.id,
                        challenge: [],
                        favorites: [],
                        freeChallenges: [],
                        signUpLoc: {
                            latitude: locations?.latitude || null,
                            longitude: locations?.longitude || null
                        },
                        inAppNotification: preferences?.inAppNotification,
                        notificationToMyPost: preferences?.notificationToMyPost,
                        optOutCommunication: preferences?.optOutCommunication,
                        language: preferences?.language,
                        ...response,
                    }
                };
                await res.send({
                    message: 'Login Successful.',
                    data: updatedResponse,
                    status: 200,
                    success: true
                });
            }
            else if (response.isAdmin) {
                const token = await authUser.createJWTToken({ id: response.id });
                response.accessToken = token;
                await res.send({
                    message: 'Admin Login Successful.',
                    data: response,
                    status: 200,
                    success: true
                });
            } else {
                res.send({
                    message: 'Please verify email before login.',
                    data: null,
                    status: 200,
                    success: false
                });
            }
        }
        else {
            res.send({
                message: 'Please enter correct email or password.',
                data: null,
                status: 200,
                success: false
            });
        }
    } catch (e) {
        return res.send({
            msg: 'Error',
            data: e.message
        });
    }
};

userController.registerUser = async (req, res) => {
    try {
        let response = await userService.addUsersList(req.body);
        console.log('////', response);
        if (size(response) > 0) {
            const locations = await userService.addUserLocation(req.body, response.id);
            const preferences = await userService.addUserPreference(req.body, response.id);
            const token = await authUser.createJWTToken({ id: response.id });
            if (!response?.isVerified) {
                await authUser.sendEmailVerificationLink(response);
            }
            const updatedResponse = {
                accessToken: token,
                user: {
                    _id: response?.id,
                    challenge: [],
                    favorites: [],
                    freeChallenges: [],
                    signUpLoc: {
                        latitude: locations?.latitude || null,
                        longitude: locations?.longitude || null
                    },
                    inAppNotification: preferences?.inAppNotification,
                    notificationToMyPost: preferences?.notificationToMyPost,
                    optOutCommunication: preferences?.optOutCommunication,
                    language: preferences?.language,
                    ...response.toObject(),
                }
            };
            await res.send({
                message: 'Sign Up successful. Please verify your email.',
                data: updatedResponse,
                status: 200,
                success: true
            });
        }
        else {
            res.send({
                message: 'No user found',
                data: null,
                status: 200,
                success: false
            });
        }
    } catch (e) {
        return res.send({
            message: 'Error',
            data: e.message,
            status: 500,
            success: false
        });
    }
};

userController.getUsersList = async (req, res) => {
    try {
        let response = await userService.getUsersList(req.body);
        await res.send({
            msg: 'Success',
            data: response
        });
    } catch (e) {
        return res.send({
            msg: 'Error',
            data: e
        });
    }
};

userController.verifyEmail = async (req, res) => {
    try {
        let response = await userService.verifyEmail(req.body);
        if (size(response) > 0 && response.isVerified) {
            await res.send({
                msg: 'Email Verified Successfully.',
                data: {}
            });
        }
        else {
            await res.send({
                msg: 'Email already verified.',
                data: {}
            });
        }
    } catch (e) {
        return res.send({
            msg: 'Error',
            data: e
        });
    }
};

userController.addGuestUser = async (req, res) => {
    try {
        let response = await userService.addGuestUser(req.body);
        await res.send({
            msg: 'Guest user added successfully',
            data: response
        });
    } catch (e) {
        return res.send({
            msg: 'Error',
            data: e
        });
    }
};

userController.editUsersList = async (req, res) => {
    try {
        let id = req.params.id;
        let response = await userService.editUsersList(id, req.body);
        res.send({
            msg: 'Success',
            data: response
        });
    } catch (e) {
        return res.send({
            msg: 'Error',
            data: e
        });
    }
};

userController.deleteUsersList = async (req, res) => {
    try {
        let id = req.params.id;
        let response = await userService.deleteUsersList(id);
        res.send({
            msg: 'Success',
            data: response
        });
    } catch (e) {
        return res.send({
            msg: 'Error',
            data: e
        });
    }
};

module.exports = userController;