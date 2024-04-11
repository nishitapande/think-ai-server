const express = require("express");
const cors = require("cors");
const router = express.Router();
const eventController = require("../controllers/eventController");
const authenticateToken = require("../middlewares/authMiddleware");

router.use(cors());

router.get("/", eventController.getAllEvents);
router.post("/createevent", authenticateToken, eventController.createEvent);

module.exports = router;
