const mongoose = require('mongoose');

// Define schema for login-signup
const loginSignupSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

// Create model for login-signup
const LoginSignupModel = mongoose.model("LoginSignup", loginSignupSchema);

// Export model
module.exports = LoginSignupModel;
