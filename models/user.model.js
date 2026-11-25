const mongoose = require("mongoose")
const bCrypt = require("bcryptjs")

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    role: {
        type: String,
        required: [true, "Role is required"]
    }
})

UserSchema.methods.setPassword = function(password) {
  var re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  if(password && re.test(password)){
    this.password = bCrypt.hashSync(password, bCrypt.genSaltSync(6));
  } else {
    throw new Error("Password must have uppercase letters, lowercase letters, numbers and symbols")
  }
};

UserSchema.methods.validPassword = function(password) {
  return bCrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);