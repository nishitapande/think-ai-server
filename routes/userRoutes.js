const express = require("express");
const cors = require("cors");
const router = express.Router();
const authController = require("../controllers/authController");

router.use(cors());

router.post("/createadmin", authController.createAdmin);
router.post("/login", authController.login);

module.exports = router;
