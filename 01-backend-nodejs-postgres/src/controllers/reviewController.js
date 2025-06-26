const reviewModel = require('../models/reviewModel');

// GET: Lấy toàn bộ review của 1 flashcard
async function getReviewsByFlashcard(req, res) {
  const { flashcard_id } = req.params;

  try {
    const reviews = await reviewModel.getReviewsByFlashcard(flashcard_id);
    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error getting reviews by flashcard:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// GET: Lấy review gần nhất
async function getLatestReview(req, res) {
  const { user_id, flashcard_id } = req.params;

  try {
    const review = await reviewModel.getLatestReview(user_id, flashcard_id);
    if (!review) {
      return res.status(404).json({ message: 'No review found' });
    }
    res.status(200).json(review);
  } catch (error) {
    console.error('Error getting latest review:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// GET: Lấy toàn bộ review của user
async function getReviewsByUser(req, res) {
  const { user_id } = req.params;

  try {
    const reviews = await reviewModel.getReviewsByUser(user_id);
    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error getting reviews by user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  getReviewsByFlashcard,
  getLatestReview,
  getReviewsByUser
};
