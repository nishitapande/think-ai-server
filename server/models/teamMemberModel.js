const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Member must have a name"],
  },
  email: {
    type: String,
    required: [true, "Member must be a valid email address"],
  },
  position: {
    type: String,
    //required: [true, "Member must have a position"],
  },
  linkedIn: {
    type: String,
    //required: [true, "Member must have a linkedIn profile"],
  },
  instagram: {
    type: String,
    //required: [true, 'Member must have an instagram profile'],
  },
  image: {
    type: String,
    //required: [true, 'Member must have an image'],
  },
});

const Member = mongoose.model("Member", memberSchema);
module.exports = Member;
