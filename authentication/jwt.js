const authUser = {};
var jwt = require('jsonwebtoken');
const { successResponse, errorResponse } = require('../utils/helpers');
const nodemailer = require('nodemailer');
const Modals = require('../models');

authUser.createJWTToken = async (data) => {
    var token = jwt.sign(data, process.env.JWT_PRIVATE_KEY);
    return token;
}

authUser.validateJWTToken = async (req, res, next) => {
    let token = req.headers && req.headers['authorization'];
    if (!token) return false;
    try {
        const authToken = token.split(" ")[1];
        var user = jwt.verify(authToken, process.env.JWT_PRIVATE_KEY);
        const currentUser = await Modals.Users.findOne({
            email: user.email,
            _id: user._id
        });
        if (currentUser) {
            req.currentUser = currentUser;
        }
        next();
    }
    catch (err) {
        errorResponse(res, { message: 'Invalid Token', status: 404 })
    }
}

authUser.sendEmailVerificationLink = async (data) => {
    console.log('data islll',data)
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sengineering5337@gmail.com',
            pass: 'niff fdoy gclg opzz'
        }
    });

    let mailOptions = {
        from: 'sengineering5337@gmail.com',
        to: data.email,
        subject: 'Verify Email to access features: Track The Trail',
        text: `
        Hii ${data.name}

        Thank for Sign up with Track The Trail.
        Here is the link for verify email account:
        ${`http://localhost:8000/verifyEmail/${data.verificationToken}`}

        Thank you
        `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log('Error: ' + error.message);
        }
        console.log('Email sent: ' + info.response);
    });
}

module.exports = authUser;