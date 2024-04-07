const Member = require("../models/teamMemberModel");

exports.getAllMembers = async (req, res, next) => {
  try {
    const teammembers = await Member.find({});
    if (teammembers.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "No team members found",
      });
    }
    res.status(200).json({
      status: "success",
      teammembers,
    });
    next();
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.createMember = async (req, res, next) => {
  try {
    const { name, email, position, linkedIn, instagram, image } = req.body;
    const user = await Member.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({
        status: "error",
        message: "Email already exists",
      });
    }
    const teamMember = await Member.create({
      name,
      position,
      linkedIn,
      instagram,
      email,
      image,
    });
    res.status(201).json({
      status: "success",
      message: "Member created successfully",
      teamMember,
    });
    next();
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
