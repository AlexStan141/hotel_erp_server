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
            message: "Email already registered" 
        });
    } 

    const newUser = new User({ username, email, role});
    newUser.setPassword(password)
    await newUser.save();

    res.json({ 
        status: "success",
        code: 200,
        message: "User created successfully!"
    });

  } catch (error) {
    res.json({ 
        status: "error",
        code: 500,
        message: error.message
    });
  }
};


const login = async (req, res) => {
  try {
    const {email, password} = req.body;

    const user = await User.findOne({email});
    if(!user || !user.validPassword(password)){
      return res.json({
        status: "error",
        code: 401,
        message: "Unauthorized"
      })
    }

    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role
    }

    const token = jwt.sign(payload, process.env.secret, {expiresIn: '1h'});
    return res.json({
      status: "success",
      code: 200,
      data: token
    })

  } catch(error) {
    res.json({ 
        status: "error",
        code: 500,
        message: error.message
    });
  }
}


module.exports = {
  register,
  login
}