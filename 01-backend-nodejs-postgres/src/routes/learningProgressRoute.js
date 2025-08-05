const express = require("express");
const router = express.Router();
const LearningProgressController = require("../controllers/learningProgressController");

// POST: lưu kết quả học tập
router.post("/save", LearningProgressController.create);

// GET: lấy tất cả kết quả của 1 user
router.get("/get/:user_id", LearningProgressController.getAllByUser);

module.exports = router;
