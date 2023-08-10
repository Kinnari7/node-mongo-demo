const userController = {};
const { size } = require('lodash');
const userService = require('./userService');
const authUser = require('../../../authentication/jwt');
const uploadImage = require('../../../uploadImage');

userController.loginUser = async (req, res) => {
    try {
        let response = await userService.authUser(req.body);
        if(size(response) > 0){
            const token = await authUser.createJWTToken({_id: response._id});
            response.accessToken = token;
            res.send({
                msg: 'Success',
                data: response
            })
        }
        else{
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
/** 
@param
*/ 
userController.getUsersList = async (req, res) => {
    try {
        let response = await userService.getUsersList(req.body);
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

userController.getProductsList = async (req, res) => {
    try {
        let response = await userService.getProductsList();
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

userController.addUsersList = async (req, res) => {
    try {
        let response = await userService.addUsersList(req.body);
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
    console.log('req body is.....',req.body)
    const data = uploadImage.uploadImage;
    console.log('data is.....',data)
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