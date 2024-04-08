const Event = require("../models/eventModel");

exports.getAllEvents = async (req, res, next) => {
  try {
    const events = await Event.find({});
    if (events.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "No team members found",
      });
    }
    res.status(200).send(events);
    next();
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.createEvent = async (req, res, next) => {
  try {
    const {
      title,
      coverImg,
      registerLink,
      description,
      dateOfEvent,
      upcomming,
    } = req.body;
    const event = await Event.findOne({ title: req.body.title });
    if (event) {
      return res.status(400).json({
        status: "error",
        message: "Email already exists",
      });
    }
    const newevent = await Event.create({
      title,
      coverImg,
      registerLink,
      description,
      dateOfEvent,
      upcomming,
    });
    res.status(201).json({
      status: "success",
      message: "Event created successfully",
      newevent,
    });
    next();
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
