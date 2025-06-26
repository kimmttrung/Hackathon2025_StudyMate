const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// GET /reviews/flashcard/:flashcard_id - toàn bộ review theo flashcard
router.get('/flashcard/:flashcard_id', reviewController.getReviewsByFlashcard);

// GET /reviews/latest/:user_id/:flashcard_id - review gần nhất
router.get('/latest/:user_id/:flashcard_id', reviewController.getLatestReview);

// GET /reviews/user/:user_id - toàn bộ review của user
router.get('/user/:user_id', reviewController.getReviewsByUser);

module.exports = router;
