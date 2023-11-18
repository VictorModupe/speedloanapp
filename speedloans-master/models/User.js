const mongoose = require('mongoose')
const bcrypt = require("bcrypt")
const {generateUniqueId} = require("../utilities/utilities")

const userModel = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, default: null },
  is_phone_verified: { type: Boolean, default: false },
  is_email_verified: { type: Boolean, default: false },
  password: { type: String, required: true },
  profile_image: { type: String, default: null },
  userpubkey: { type: String, default: "PUB_USER_" + generateUniqueId(10) },
  transaction_pin: { type: String, default: null },
  status: { type: String, default: "ACTIVE" },
  last_login:{ type: Date, default: Date.now },
  date_created: { type: Date, default: new Date() },
  date_updated: { type: Date, default: Date.now },
});

userModel.pre("save",async function (next) {
    const password = this.password
    const hashedPasword = await bcrypt.hash(password,10);
    this.password = hashedPasword
    next()
})

const User = mongoose.model('User',userModel);

module.exports = User