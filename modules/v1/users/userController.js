const userController = {};
const userService = require('./userService');

userController.getUsersList = async (req, res) => {
    console.log('req is....', req);
};

module.exports = userController;