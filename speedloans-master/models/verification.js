const mongoose = require('mongoose');

const verifSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
    default: () => new Date(Date.now() + 30 * 60 * 1000), // Set default expiration to 30 minutes from now
  },
});

const Verification = mongoose.model('Verification', verifSchema);

module.exports = Verification;
