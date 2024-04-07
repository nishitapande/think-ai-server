const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.login = async (req, res, next) => {
  //STEP1: IF USER IS PRESENT
  const { email, password } = req.body;
  const user = User.findOne(email);
  if (!user) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }
  //STEP2: IF PASSWORD IF CORRECT
  const isPasswordCorrect = await matchPassword(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }
  //STEP3: CREATE TOKEN
  const token = signToken(user._id);

  res.status(200).json({
    status: "success",
    token,
  });
};
