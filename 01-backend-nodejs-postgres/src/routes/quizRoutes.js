// routes/quizRoutes.js
const express = require("express");
const router = express.Router();
const quizController = require("../controllers/quizController");

// POST /api/quiz/create
router.post("/create", quizController.createMultipleQuizzes);
// Route: GET tất cả quiz theo folder_id
router.get("/folder/:folder_id", quizController.getQuizzesByFolder);
// PUT /api/quiz/:id
router.put("/:id", quizController.updateQuizById);
// DELETE /api/quiz/:id
router.delete("/:id", quizController.deleteQuizById);

module.exports = router;