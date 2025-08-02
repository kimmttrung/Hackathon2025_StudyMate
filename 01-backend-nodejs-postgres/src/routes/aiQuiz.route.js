const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const aiQuizController = require("../controllers/aiQuizController");

router.post("/text", aiQuizController.generateQuizFromText);
router.post("/upload", upload.single("file"), aiQuizController.generateQuizFromFile);

module.exports = router;