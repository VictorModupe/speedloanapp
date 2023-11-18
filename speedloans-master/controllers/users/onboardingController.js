const User = require("../../models/User");
const Verification = require("../../models/verification");

const bcrypt = require("bcrypt");
const {
  cleanme,
  generateCode,
  send_message,
} = require("../../utilities/utilities");

const onboardingController = {
  verify_phone_code: async (req, res) => {
    const userId = req.userId;
    const code = req.body.code;
    try {
      const verify = await Verification.findOne({ user: userId });
      if (verify) {
        const verif_code = verify.code;
        if (cleanme(code) == verif_code) {
          const update = await User.findOneAndUpdate(
            { _id: userId },
            { is_phone_verified: true }
          );
          return res.status(200).send({
            status: true,
            message: "Phone number has been successfully verified!",
            statusCode: 200,
          });
        } else {
          return res.status(400).send({
            status: false,
            message: "Incorrect OTP sent!",
          });
        }
      } else {
        return res.status(400).send({
          status: false,
          message: "No user associated with this OTP!",
          statusCode: 400,
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: false,
        message: error.message,
        statusCode: 500,
      });
    }
  },
  get_phone_code: async (req, res) => {
    try {
      const userId = req.userId;
      var phone = req.body.phone;
      const code = generateCode(5);
      const message = `Your OTP is ${code}.Note that you can only use it once.`;
      if (phone) {
        phone = cleanme(phone);
        const response = await send_message(phone, 1, message, "SPEEDLOAN");
        if (response) {
          const deleteall = await Verification.deleteMany({ user: userId });
          if (deleteall) {
            const user = await Verification.create({ user: userId, code });
            const update = await User.findOneAndUpdate(
              { _id: userId },
              { phone }
            );
            return res.status(200).send({
              status: true,
              message: "An OTP has been sent to your phone number : " + phone,
              statusCode: 200,
            });
          }
        } else {
          return res.status(500).send({
            status: false,
            message: "Error send code to phone number",
            statusCode: 500,
          });
        }
      } else {
        return res.status(401).send({
          status: false,
          message: "Phone number is required!",
          statusCode: 401,
        });
      }
    } catch (error) {
      return res.status(500).send({
        status: false,
        message: error.message,
        statusCode: error.status,
      });
    }
  },
  change_password: async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(400).send({
        status: false,
        message: "Old password and new password is required!",
        statusCode: 400,
      });
    }

    // Get user Info
    const userId = req.userId;
    try {
      const user = await User.findById(userId);
      if (user) {
        // Check if old password is correct
        const oldPasswordMatch = await bcrypt.compare(
          oldPassword,
          user.password
        );
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        if (oldPasswordMatch) {
          // Change password
          user.password = hashedPassword;
          const updatedUser = await User.findByIdAndUpdate(userId, {
            password: hashedPassword,
          });

          if (updatedUser) {
            return res.status(200).send({
              status: true,
              message: "Password has been successfully changed!",
              statusCode: 200,
            });
          }
        } else {
          return res.status(400).send({
            status: false,
            message: "Incorrect old password!",
            statusCode: 400,
          });
        }
        dating - ap / controllers / users / onboardingController.js;
      } else {
        return res.status(400).send({
          status: false,
          message: "No user found!",
          statusCode: 400,
        });
      }
    } catch (error) {
      return res.status(500).send({
        status: false,
        message: error.message,
        statusCode: 500,
      });
    }
  },

  create_transaction_pin: async (req, res) => {
    const { pin } = req.body;

    // Check if the PIN is a number and not exceeding 4 digits
    if (typeof pin !== "string" || pin < 1000 || pin > 9999) {
      return res.status(400).send({
        status: false,
        message: "Invalid PIN. The PIN must be a 4-digit number.",
        statusCode: 400,
      });
    }

    // Get user Info
    const userId = req.userId;
    try {
      const hashedPin = await bcrypt.hash(pin.toString(), 10); // Convert the PIN to a string before hashing

      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).send({
          status: false,
          message: "User not found!",
          statusCode: 404,
        });
      }
      const updatedUser = await User.findByIdAndUpdate(userId, {
        transaction_pin: hashedPin,
      });
      if (updatedUser) {
        return res.status(200).send({
          status: true,
          message: "Pin has been successfully created!",
          statusCode: 200,
        });
      } else {
        return res.status(500).send({
          status: false,
          message: "Internal server error",
          statusCode: 500,
        });
      }
    } catch (error) {
      return res.status(500).send({
        status: false,
        message: error.message,
        statusCode: 500,
      });
    }
  },

  change_transaction_pin: async (req, res) => {
    const { oldPin, newPin } = req.body;

    // Check if the old PIN and new PIN are numbers and not exceeding 4 digits
    if (
      typeof oldPin !== "string" ||
      typeof newPin !== "string" ||
      oldPin < 1000 ||
      oldPin > 9999 ||
      newPin < 1000 ||
      newPin > 9999
    ) {
      return res.status(400).send({
        status: false,
        message: "Invalid PIN. The PIN must be a 4-digit number.",
        statusCode: 400,
      });
    }
    // Get user Info
    //$2b$10$ND3lk3arAqIld/MqDCPjIuLW43Z9iZB3G4ZLBx1qLpCSryMCu0z..
    const userId = req.userId;
    try {
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).send({
          status: false,
          message: "User not found!",
          statusCode: 404,
        });
      }

      // Verify the old PIN (hashed) against the stored PIN
      const oldPinValid = await bcrypt.compare(
        oldPin.toString(),
        user.transaction_pin
      );

      if (!oldPinValid) {
        return res.status(400).send({
          status: false,
          message: "Invalid old PIN. Please provide the correct old PIN.",
          statusCode: 400,
        });
      }

      // Hash and update the new PIN
      const newHashedPin = await bcrypt.hash(newPin.toString(), 10);
      // Save the updated user document
      const updatedUser = await User.findByIdAndUpdate(userId, {
        transaction_pin: newHashedPin,
      });
      if (updatedUser) {
        return res.status(200).send({
          status: true,
          message: "Transaction PIN has been successfully changed!",
          statusCode: 200,
        });
      } else {
        return res.status(500).send({
          status: false,
          message: "Internal server error",
          statusCode: 500,
        });
      }
    } catch (error) {
      return res.status(500).send({
        status: false,
        message: error.message,
        statusCode: 500,
      });
    }
  },

  update_phone_code: async (req, res) => {
    try {
      const userId = req.userId;
      const newPhoneNumber = req.body.new_phone;
      // Check if new_phone is provided
      if (!newPhoneNumber) {
        return res.status(400).send({
          status: false,
          message: "Phone number is required!",
          statusCode: 400,
        });
      }
      const cleanedPhone = cleanme(newPhoneNumber);
      // Generate OTP code and message
      const code = generateCode(5);
      const message = `Your OTP is ${code}`;
      const response = await send_message(cleanedPhone, 1, message, "SPEEDLOAN");
      if (response) {
        const deleteAll = await Verification.deleteMany({ user: userId });
        if (deleteAll) {
          const user = await Verification.create({ user: userId, code });
          const update = await User.findOneAndUpdate(
            { _id: userId },
            { phone: cleanedPhone, is_phone_verified: false }
          );

          return res.status(200).send({
            status: true,
            message:
              "An OTP has been sent to your phone number: " + cleanedPhone,
            statusCode: 200,
          });
        } else {
          return res.status(500).send({
            status: false,
            message: "Error sending code to the phone number",
            statusCode: 500,
          });
        }
      } else {
        return res.status(500).send({
          status: false,
          message: "Error sending code to phone number",
          statusCode: 500,
        });
      }
    } catch (error) {
      return res.status(500).send({
        status: false,
        message: error.message,
        statusCode: error.status || 500,
      });
    }
  },
  
};




module.exports = onboardingController;
