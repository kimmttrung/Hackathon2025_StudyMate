const flashcardModel = require('../models/flashcardModel');

// Thêm flashcard mới
async function createFlashcard(req, res) {
  try {
    const flashcard = req.body;
    const newFlashcard = await flashcardModel.insertFlashcard(flashcard);
    res.status(201).json(newFlashcard);
  } catch (error) {
    console.error('Error creating flashcard:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Lấy tất cả flashcard trong folder
async function getFlashcardsByFolder(req, res) {
  const { folderId } = req.params;

  try {
    const flashcards = await flashcardModel.getFlashcardByFolder(folderId);
    res.status(200).json(flashcards);
  } catch (error) {
    console.error('Error fetching flashcards:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Lấy flashcards đến hạn ôn trong folder
async function getFlashcardsByDueDate(req, res) {
  const { folderId } = req.params;
  const { dueDate } = req.query;

  try {
    const flashcards = await flashcardModel.getFlashcardByDueDate(
      folderId,
      dueDate ? new Date(dueDate) : new Date()
    );
    res.status(200).json(flashcards);
  } catch (error) {
    console.error('Error fetching due flashcards:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Ôn tập flashcard
async function reviewFlashcard(req, res) {
  const { flashcardId } = req.params;
  const { user_id, quality } = req.body;

  try {
    const result = await flashcardModel.reviewFlashcard(user_id, flashcardId, quality);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error reviewing flashcard:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  createFlashcard,
  getFlashcardsByFolder,
  getFlashcardsByDueDate,
  reviewFlashcard,
};
