var express = require('express');
const { index, checkInputs, validateInputs, sendResponse, checkLoginInput, 
    validateLoginInput, validateEmail,
     sendForgotPasswordMail,
     verify_password_token,
     resetPassword} = require('../../controllers/users/authController');
     
var userAuthRouter = express.Router();

userAuthRouter.get("/",index)
userAuthRouter.post("/register",checkInputs,validateInputs,sendResponse)
userAuthRouter.post("/login",checkLoginInput,validateLoginInput,sendResponse)
userAuthRouter.post("/forgot-password",validateEmail,sendForgotPasswordMail,sendResponse)
userAuthRouter.post("/reset-password",resetPassword)
userAuthRouter.get("/verify-token/:token",verify_password_token)

module.exports = userAuthRouter