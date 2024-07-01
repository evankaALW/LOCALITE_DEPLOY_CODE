//router code to handle the POST request of /send-otp and /verify-otp
const express = require('express');
const postOTPRouter = express.Router();
const otpController = require('../controllers/postOTPRegistrationController');

postOTPRouter.post('/send-otp', otpController.sendOtp);
postOTPRouter.post('/verify-otp', otpController.verifyOtp);

module.exports = postOTPRouter;
