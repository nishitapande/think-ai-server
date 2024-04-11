const express = require("express");
const cors = require("cors");

const router = express.Router();
const teamController = require("../controllers/teamController");
const authenticateToken = require("../middlewares/authMiddleware");

router.use(cors());

router.get("/", teamController.getAllMembers);
router.post("/newmember", authenticateToken, teamController.createMember);

module.exports = router;
