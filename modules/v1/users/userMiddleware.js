const Modals = require("../../../models");
const { size } = require('lodash');
const userMiddleware = {};

userMiddleware.emailExists = async (req, res, next) => {
    let data = req.body;
    const user = await Modals.Users.findOne({ email: data.email });
    if(size(user) > 0){
        return await res.send({
            msg: 'Email already exists.',
            data: {}
        })
    }
    next();
};

module.exports = userMiddleware;