const userController = {};
const { size } = require('lodash');
const userService = require('./userService');
const authUser = require('../../../authentication/jwt');
const uploadImage = require('../../../uploadImage');

userController.loginUser = async (req, res) => {
    try {
        let response = await userService.authUser(req.body);
        if (size(response) > 0) {
            if (response?.isVerified || response?.isAdmin) {
                const locations = await userService.addUserLocation(req.body, response._id);
                const preferences = await userService.addUserPreference(req.body, response._id);
                const token = await authUser.createJWTToken({ _id: response._id });
                response.accessToken = token;
                const updatedResponse = {
                    ...response,
                    accessToken: token,
                    user: {
                        _id: response?._id,
                        challenge: []
                    },
                    favorites: [],
                    freeChallenges: [],
                    signUpLoc: {
                        latitude: locations?.latitude || null,
                        longitude: locations?.longitude || null
                    },
                    inAppNotification: preferences?.inAppNotification,
                    notificationToMyPost: preferences?.notificationToMyPost,
                    optOutCommunication: preferences?.optOutCommunication,
                    language: preferences?.language
                };
                await res.send({
                    msg: 'Login Successful.',
                    data: updatedResponse
                })
            } else {
                res.send({
                    msg: 'Please verify email before login.',
                    data: null
                })
            }
        }
        else {
            res.send({
                msg: 'Please enter correct email or password.',
                data: null
            })
        }
    } catch (e) {
        return res.send({
            msg: 'Error',
            data: e.message
        })
    }
};

userController.registerUser = async (req, res) => {
    try {
        let response = await userService.addUsersList(req.body);
        if (size(response) > 0) {
            const locations = await userService.addUserLocation(req.body, response._id);
            const preferences = await userService.addUserPreference(req.body, response._id);
            const token = await authUser.createJWTToken({ _id: response._id });
            if (!response?.isVerified) {
                await authUser.sendEmailVerificationLink(response);
            }
            const updatedResponse = {
                ...response.toObject(),
                accessToken: token,
                user: {
                    _id: response?._id,
                    challenge: []
                },
                favorites: [],
                freeChallenges: [],
                signUpLoc: {
                    latitude: locations?.latitude || null,
                    longitude: locations?.longitude || null
                },
                inAppNotification: preferences?.inAppNotification,
                notificationToMyPost: preferences?.notificationToMyPost,
                optOutCommunication: preferences?.optOutCommunication,
                language: preferences?.language
            };
            await res.send({
                msg: 'Sign Up successful. Please verify your email.',
                data: updatedResponse
            })
        }
        else {
            res.send({
                msg: 'No user found',
                data: null
            })
        }
    } catch (e) {
        return res.send({
            msg: 'Error',
            data: e.message
        })
    }
};

userController.getUsersList = async (req, res) => {
    try {
        let response = await userService.getUsersList(req.body);
        await res.send({
            msg: 'Success',
            data: response
        })
    } catch (e) {
        return res.send({
            msg: 'Error',
            data: e
        })
    }
};

userController.verifyEmail = async (req, res) => {
    try {
        let response = await userService.verifyEmail(req.body);
        if (size(response) > 0 && response.isVerified) {
            await res.send({
                msg: 'Email Verified Successfully.',
                data: {}
            })
        }
        else {
            await res.send({
                msg: 'Email already verified.',
                data: {}
            })
        }
    } catch (e) {
        return res.send({
            msg: 'Error',
            data: e
        })
    }
};

userController.addGuestUser = async (req, res) => {
    try {
        let response = await userService.addGuestUser(req.body);
        await res.send({
            msg: 'Guest user added successfully',
            data: response
        })
    } catch (e) {
        return res.send({
            msg: 'Error',
            data: e
        })
    }
};

userController.editUsersList = async (req, res) => {
    try {
        let id = req.params.id;
        let response = await userService.editUsersList(id, req.body);
        res.send({
            msg: 'Success',
            data: response
        })
    } catch (e) {
        return res.send({
            msg: 'Error',
            data: e
        })
    }
};

userController.deleteUsersList = async (req, res) => {
    try {
        let id = req.params.id;
        let response = await userService.deleteUsersList(id);
        res.send({
            msg: 'Success',
            data: response
        })
    } catch (e) {
        return res.send({
            msg: 'Error',
            data: e
        })
    }
};

userController.uploadImage = async (req, res) => {
    console.log('req body is.....', req.body)
    const data = uploadImage.uploadImage;
    console.log('data is.....', data)
    // try {
    //     res.send({
    //         msg: 'Success',
    //         data: 'Image uploaded successfully.'
    //     })
    // } catch (e) {
    //     return res.send({
    //         msg: 'Error',
    //         data: e
    //     })
    // }
};

module.exports = userController;