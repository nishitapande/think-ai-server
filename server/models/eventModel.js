const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "A event must have a title"],
  },
  coverImg: {
    type: String,
    //required: [true, "A event must have a cover image"],
  },
  registerLink: {
    type: String,
  },
  description: {
    type: String,
    //required: [true, "A event must have a description"],
  },
  dateOfEvent: {
    type: Date,
    //required: [true, "A event must have a date"],
  },
  upcomming: {
    type: Boolean,
    //required: [true, "A event must have an upcomming status"],
    default: true,
  },
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
