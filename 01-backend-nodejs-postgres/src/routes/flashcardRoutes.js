const express = require('express');
const router = express.Router();
const flashcardController = require('../controllers/flashcardController');

// POST /flashcards - thêm flashcard
router.post('/create', flashcardController.createFlashcard);

// GET /flashcards/folder/:folderId - lấy theo folder
router.get('/folder/:folderId', flashcardController.getFlashcardsByFolder);

// GET /flashcards/folder/:folderId/due - flashcards đến hạn ôn
router.get('/folder/:folderId/due', flashcardController.getFlashcardsByDueDate);

// POST /flashcards/:flashcardId/review - ôn tập flashcard
router.post('/:flashcardId/review', flashcardController.reviewFlashcard);

// Cập nhật flashcard
router.put('/:id', flashcardController.updateFlashcardControler);

// Xoá flashcard
router.delete('/:id', flashcardController.deleteFlashcardControler);

// GET /api/quiz/:folderId
router.get("/quiz/:folderId", flashcardController.getQuizByFolder);

module.exports = router;
