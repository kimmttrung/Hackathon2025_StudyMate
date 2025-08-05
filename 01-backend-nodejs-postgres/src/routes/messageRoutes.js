const express = require("express");
const router = express.Router();
const { getMessageHistory } = require("../controllers/messageController");
const authMiddleware = require("../middleware/jwtauth");

router.get("/:userId", authMiddleware, getMessageHistory);

module.exports = router;
