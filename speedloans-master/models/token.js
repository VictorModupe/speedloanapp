const mongoose = require('mongoose');

const forgotPasswordTokenSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
    default: () => new Date(Date.now() + 30 * 60 * 1000), // Set default expiration to 30 minutes from now
  },
});

const ForgotPasswordToken = mongoose.model('ForgotPasswordToken', forgotPasswordTokenSchema);

module.exports = ForgotPasswordToken;
