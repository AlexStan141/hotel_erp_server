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
  this.password = bCrypt.hashSync(password, bCrypt.genSaltSync(6));
};

UserSchema.methods.validPassword = function(password) {
  return bCrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", UserSchema);