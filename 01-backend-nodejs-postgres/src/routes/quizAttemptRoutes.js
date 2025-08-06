const express = require("express");
const router = express.Router();
const quizAttemptController = require("../controllers/quizAttemptController");

// Lưu kết quả sau khi ôn tập
router.post("/submit", quizAttemptController.saveQuizResult);

// Lấy tất cả kết quả của user
router.get("/user/:user_id", quizAttemptController.getUserAttempts);

module.exports = router;
