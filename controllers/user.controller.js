const User = require("../models/user.model")
const jwt = require("jsonwebtoken")

const register = async (req, res) => {
  try {
    // Datele sunt deja validate de Joi în pasul anterior!
    const { username, email, password, role} = req.body;

    const userExists = await User.findOne({ email });
    if (userExists){
        return res.json({
            status: "error",
            code: 409,
            message: "Email deja înregistrat" 
        });
    } 

    const newUser = new User({ username, email, role});
    newUser.setPassword(password)
    await newUser.save();

    res.json({ 
        status: "success",
        code: 200,
        message: "Utilizator creat cu succes!"
    });

  } catch (error) {
    res.json({ 
        status: "error",
        code: 500,
        message: error.message
    });
  }
};

module.exports = {
  register
}