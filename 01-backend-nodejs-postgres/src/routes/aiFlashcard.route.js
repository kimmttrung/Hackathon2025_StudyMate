
const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" }); // lưu file tạm vào thư mục uploads/

const aiFlashcardController = require("../controllers/aiFlashcard.controller");

router.post("/upload", upload.single("file"), aiFlashcardController.handleFileUpload);
router.post("/text", aiFlashcardController.handleTextInput);
module.exports = router;
