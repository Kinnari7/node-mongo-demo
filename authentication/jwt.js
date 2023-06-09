const authUser = {};
var jwt = require('jsonwebtoken');
const { successResponse, errorResponse } = require('../utils/helpers');
const Modals = require('../models');

authUser.createJWTToken = async (data) => {
    var token = jwt.sign(data, process.env.JWT_PRIVATE_KEY);
    return token;
}

authUser.validateJWTToken = async (req, res, next) => {
    let token = req.headers && req.headers['authorization'];
    if(!token) return false;
    try{
        const authToken = token.split(" ")[1];
        var user = jwt.verify(authToken, process.env.JWT_PRIVATE_KEY);
        const currentUser = await Modals.Users.findOne({
            email: user.email,
            _id: user._id
        });
        if(currentUser){
            req.currentUser = currentUser; 
        }
        next();
    }
    catch (err){
        errorResponse(res, { message: 'Invalid Token', status: 404 })
    }
}

module.exports = authUser;