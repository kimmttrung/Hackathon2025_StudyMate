const express = require('express');
const router = express.Router();
const flashcardController = require('../controllers/flashcardController');

// POST /flashcards - thêm flashcard
router.post('/', flashcardController.createFlashcard);

// GET /flashcards/folder/:folderId - lấy theo folder
router.get('/folder/:folderId', flashcardController.getFlashcardsByFolder);

// GET /flashcards/folder/:folderId/due - flashcards đến hạn ôn
router.get('/folder/:folderId/due', flashcardController.getFlashcardsByDueDate);

// POST /flashcards/:flashcardId/review - ôn tập flashcard
router.post('/:flashcardId/review', flashcardController.reviewFlashcard);

module.exports = router;
