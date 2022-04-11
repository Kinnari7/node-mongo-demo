const userController = {};
const userService = require('./userService');

userController.getUsersList = async (req, res) => {
    try {
        let response = await userService.getUsersList();
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

module.exports = userController;