const User = require("../models/userModel");
const generateToken = require("../config/jwtConfig");

exports.createAdmin = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(401).json({
      message: "User Exists",
    });
  }
  const { name, email, password } = req.body;

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
  const user = await User.findOne({ email });
  console.log(user);
  if (!user) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }
  //STEP2: IF PASSWORD IF CORRECT
  const isPasswordCorrect = await user.comparePasswords(password);
  console.log(user.password);
  if (!isPasswordCorrect) {
    return res.status(401).json({
      message: "Invalid password",
    });
  }
  //STEP3: CREATE TOKEN
  const token = generateToken(user);

  res.status(200).json({
    token,
  });
};
