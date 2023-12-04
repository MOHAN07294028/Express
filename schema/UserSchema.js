const mongoose = require('mongoose');

function validateEmail(elementValue) {
  var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(elementValue);
}

function checkPassword(str) {
  var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
  return re.test(str);
}

let UserSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      validate: { validator: validateEmail, message: "Invalid Email" },
    },
    password: {
      type: String,
      required: true,
      validate: { validator: checkPassword, message: "Invalid Password" },
    },
    createdAt: { type: Date, default: Date.now() },
  },
  { collection: "user", versionKey: false }
);

let UserModal = mongoose.model("user", UserSchema);

module.exports = { UserModal };
