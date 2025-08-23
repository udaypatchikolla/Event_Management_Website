const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
  name: String,
  email: {type:String, unique:true},
  password: String,
  otp: String,
  otpExpiry: Date,
  isVerified: {type: Boolean, default: false}
})

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;