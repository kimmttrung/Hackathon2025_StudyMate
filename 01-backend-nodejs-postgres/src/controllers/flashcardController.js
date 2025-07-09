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

// Cập nhật flashcard
async function updateFlashcardControler(req, res) {
  try {
    const { id } = req.params;
    const { front_text, back_text } = req.body;

    if (!front_text || !back_text) {
      return res.status(400).json({ error: "Thiếu mặt trước hoặc mặt sau" });
    }

    const updated = await flashcardModel.updateFlashcard(id, front_text, back_text);
    res.status(200).json(updated);
  } catch (error) {
    console.error("Error updating flashcard:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Xoá flashcard
async function deleteFlashcardControler(req, res) {
  try {
    const flashcardId = req.params.id;

    const deletedFlashcard = await flashcardModel.deleteFlashcard(flashcardId);

    if (!deletedFlashcard) {
      return res.status(404).json({ error: 'Flashcard không tồn tại' });
    }

    res.status(200).json({ message: 'Đã xoá flashcard thành công', deleted: deletedFlashcard });
  } catch (error) {
    console.error('Error deleting flashcard:', error);
    res.status(500).json({ error: 'Lỗi server khi xoá flashcard' });
  }
}

module.exports = {
  createFlashcard,
  getFlashcardsByFolder,
  getFlashcardsByDueDate,
  reviewFlashcard,
  updateFlashcardControler,
  deleteFlashcardControler
};
