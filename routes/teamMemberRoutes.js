const express = require("express");
const router = express.Router();
const teamController = require("../controllers/teamController");

router.get("/", teamController.getAllMembers);
router.post("/newmember", teamController.createMember);

module.exports = router;
