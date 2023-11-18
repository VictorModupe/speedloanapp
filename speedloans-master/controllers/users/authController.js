const { check, validationResult } = require("express-validator"),
  bcrypt = require("bcrypt"),
  jwt = require("jsonwebtoken");
const { generateUniqueId, cleanme } = require("../../utilities/utilities");
const User = require("../../models/User");
const { sendEmailToUser } = require("../../utilities/mailing");
const ForgotPasswordToken = require("../../models/token");
const { JSONWEBTOKENSECRET } = process.env;

const userAuthController = {
  index: (req, res, next) => {
    res.json(res.data);
  },
  checkInputs: [
    check("firstname", "First name is required").notEmpty(),
    check("lastname", "Last name is required").notEmpty(),
    check("username", "Username is required").notEmpty(),
    check("phone", "Phone number is required").notEmpty(),
    check("email", "Email is required and must be valid.").isEmail(),
    check("password", "Password is required").notEmpty(),
  ],
  validateInputs: async (req, res, next) => {
    req.skip = false;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      req.skip = true;
      res.data = { data: errors.array(), statusCode: 400 };
      return next();
    }

    try {
      const existingUser = await User.findOne({
        email: cleanme(req.body.email),
      });
      const existingNickName = await User.findOne({
        nickname: cleanme(req.body.nickname),
      });
      const existingPhone = await User.findOne({
        phone: cleanme(req.body.phone),
      });

      if (existingUser || existingNickName || existingPhone) {
        req.skip = true;
        res.data = { data: [] };

        if (existingUser) {
          res.data.data.push({
            message: "Email Already Exists",
            param: "email",
          });
        }

        if (existingNickName) {
          res.data.data.push({
            message: "Username Already Exists",
            param: "username",
          });
        }
        if (existingPhone) {
          res.data.data.push({
            message: "Phone Number Already Exists",
            param: "phone",
          });
        }
        res.statusCode = 400;
        return next();
      } else {
        req.skip = false;
        const cleanedData = {};
        for (const key in req.body) {
          if (typeof req.body[key] === "string") {
            cleanedData[key] = cleanme(req.body[key]);
          } else {
            cleanedData[key] = req.body[key];
          }
        }

        const newUser = await User.create({ ...cleanedData });
        const token = jwt.sign({ id: newUser._id }, JSONWEBTOKENSECRET, {
          expiresIn: 3600,
        });
        const base_url = req.headers.origin;
        const response = await sendEmailToUser(
          cleanme(req.body.email),
          "Welcome To SPEEDLOAN",
          "WELCOME_MAIL",
          "high",
          {
            USERNAME: cleanme(req.body.firstname),
            LOGIN: base_url + "/dashboard/",
          }
        );

        if (
          response &&
          response.response &&
          response.response.split(" ")[2] === "OK"
        ) {
          res.token = token;
          res.statusCode = 200;
          return next();
        } else {
          req.skip = true;
          res.data = {
            data: [{ message: "Error sending email" }],
            statusCode: 500,
          };
          return next();
        }
      }
    } catch (error) {
      req.skip = true;
      res.data = { status: false, statusCode: 400 };

      if (error.code === 11000) {
        res.data.data = [
          { message: "Email Address Already Exists", param: "email" },
        ];
      } else {
        res.data.data = [{ message: error.message, param: "" }];
      }

      return next();
    }
  },

  checkLoginInput: [
    check("email", "Email is required and must be valid!").isEmail(),
    check("password", "Password is required!").notEmpty(),
  ],
  validateLoginInput: async function (req, res, next) {
    req.skip = false;
    const { errors } = validationResult(req);
    if (errors.length > 0) {
      req.skip = true;
      res.data.data = errors;
      res.statusCode = 400;
      next();
    } else {
      //check if email already exist...
      const existingUser = await User.findOne({ email:cleanme(req.body.email) });
      if (existingUser != null) {
        const passwordHashed = existingUser.password,
          password = req.body.password;
        const match = await bcrypt.compare(password, passwordHashed);
        if (match) {
          req.skip = false;
          const token = jwt.sign({ id: existingUser._id }, JSONWEBTOKENSECRET, {
            expiresIn: 3600,
          });
          await User.findOneAndUpdate({_id:existingUser._id},{last_login:new Date()})
          res.token = token;
          res.statusCode = 200;
          next();
        } else {
          req.skip = true;
          res.statusCode = 400;
          res.data.data = [{ message: "Wrong email/password combination" }];
          next();
        }
      } else {
        req.skip = true;
        res.statusCode = 400;
        res.data.data = [{ message: "Wrong email/password combination" }];
        next();
      }
    }
  },
  sendResponse: (req, res) => {
    if (req.skip) {
      res.data.status = false;
      res.data.statusCode = res.statusCode;
    } else {
      res.data.status = true;
      res.data.data.token = res.token;
      res.data.statusCode = res.statusCode;
    }
    res.json(res.data);
  },
  validateEmail: [
    check("email", "Email is required and must be valid.").notEmpty().isEmail(),
  ],
  sendForgotPasswordMail: async (req, res, next) => {
    req.skip = false;
    const { errors } = validationResult(req);
    if (errors.length > 0) {
      req.skip = true;
      res.data.data = errors;
      res.statusCode = 400;
      next();
    } else {
      const { email } = req.body;
      try {
        const user = await User.findOne({ email });
        if (user && user != null) {
          const { email, _id, firstname } = user;
          const result = await ForgotPasswordToken.deleteMany({ user: _id });
          if (result && result.acknowledged) {
            const fpt = await ForgotPasswordToken.create({
              user: _id,
              token: generateUniqueId(8),
            });
            const { token } = fpt;
            const base_url = req.headers.origin;
            const response = await sendEmailToUser(
              email,
              "Reset Password",
              "RESET_PASSWORD",
              "high",
              (data = {
                USERNAME: firstname,
                TOKEN_LINK: base_url + `/reset?token=` + token,
              })
            );
            if (
              response &&
              response.response &&
              response.response.split(" ")[2] == "OK"
            ) {
              req.skip = false;
              res.data.data = [
                {
                  message: "Reset email successfully sent to " + email + "",
                },
              ];
              res.statusCode = 200;
              next();
            } else {
              req.skip = true;
              res.data.data = [
                {
                  message: "Error sending email",
                },
              ];
              res.statusCode = 500;
              next();
            }
          } else {
            req.skip = true;
            res.data.data = [
              {
                message: "Error sending email",
              },
            ];
            res.statusCode = 500;
            next();
          }
        } else {
          req.skip = true;
          res.data.data = [
            {
              message: "No user associated with this email.",
            },
          ];
          res.statusCode = 400;
          next();
        }
      } catch (error) {
        req.skip = true;
        res.data.data = [
          {
            message: error.message,
          },
        ];
        res.statusCode = 400;
        next();
      }
    }
  },
  validateResetPasswordFields: [
    check("password", "Password and confirm password should be the same")
      .exists() // Ensure password field exists
      .custom((value, { req }) => value === req.body.confirm_password),
  ],
  resetPassword: async (req, res) => {
    const { password, token } = req.body;
    try {
      const user = await ForgotPasswordToken.findOne({ token });
      if (user) {
        const userId = user.user;
        const hashedPassword = await bcrypt.hash(password, 10);
        const update = await User.updateOne(
          { _id: userId },
          { password: hashedPassword }
        );
        if (update) {
          await ForgotPasswordToken.deleteMany({ token });
          res.statusCode = 200;
          res.send({
            status: true,
            message: "Password successfully reset",
            statusCode: 200,
          });
        }
      } else {
        res.statusCode = 404;
        res.send({
          status: false,
          message: "Can't verify this user",
          statusCode: 404,
        });
      }
    } catch (error) {
      res.statusCode = error.response.status;
      res.send({
        status: false,
        message: error.message,
        statusCode: error.response.status,
      });
    }
  },
  createPin: async (req, res, next) => {
    const { pin } = req.body;
    const userId = req.userId;
    try {
      const hashedPin = await bcrypt.hash(pin, 10);
      const result = await User.updateOne({ _id: userId }, { pin: hashedPin });
      if (result) {
        res.statusCode = 200;
        return res.send({
          status: true,
          statusCode: res.statusCode,
          message: "Pin successfully created!",
        });
      }
    } catch (error) {
      res.statusCode = 500;
      return res.send({
        status: false,
        statusCode: res.statusCode,
        message: "Something went wrong! Try again",
      });
    }
  },
  updatePassword: async (req, res, next) => {
    const { password } = req.body;
    const userId = req.userId;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await User.updateOne(
        { _id: userId },
        { password: hashedPassword }
      );
      if (result) {
        res.statusCode = 200;
        return res.send({
          status: true,
          statusCode: res.statusCode,
          message: "Password successfully updated!",
        });
      }
    } catch (error) {
      res.statusCode = 500;
      return res.send({
        status: false,
        statusCode: res.statusCode,
        message: "Something went wrong! Try again",
      });
    }
  },
  verify_password_token: async (req, res) => {
    const { token } = req.params;
    try {
      const response = await ForgotPasswordToken.findOne({ token });
      if (response) {
        const expiresAt = response.expiresAt;
        if (expiresAt > new Date()) {
          // Token is valid
          res.status(200).json({
            status: true,
            message: "Valid token",
          });
        } else {
          // Token has expired
          res.status(400).json({
            status: false,
            message: "This token has expired",
          });
        }
      } else {
        // Invalid token
        res.status(400).json({
          status: false,
          message: "Invalid reset password token sent",
        });
      }
    } catch (error) {
      // Handle database or other errors
      console.error(error);
      res.status(500).json({
        status: false,
        message: "Error verifying reset password token",
      });
    }
  },
};

module.exports = userAuthController;
