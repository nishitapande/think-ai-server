const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.createAdmin = async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = User.findOne(email);
  if (user) {
    return res.status(401).json({
      message: "User Exists",
    });
  }
  const newUser = await User.create({
    name,
    email,
    password,
  });
  res.status(200).json(newUser);
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
