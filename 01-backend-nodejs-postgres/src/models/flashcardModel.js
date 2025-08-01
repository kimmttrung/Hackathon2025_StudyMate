const client = require('../config/db');
const folderModel = require('./folderModel');

// INSERT: Thêm flashcard mới
async function insertFlashcard(flashcard) {
  const {
    folder_id,
    front_text,
    back_text,
    ease_factor = 2.5,
    interval = 0,
    repetition = 0,
    last_quality = null,
    last_reviewed_at = null,
    next_review_at = null,
    last_update = null,
  } = flashcard;

  const query = `
    INSERT INTO Flashcards (
      folder_id, front_text, back_text,
      ease_factor, interval, repetition, last_quality,
      last_reviewed_at, next_review_at, last_update
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
    RETURNING *;
  `;

  const values = [
    folder_id, front_text, back_text,
    ease_factor, interval, repetition, last_quality,
    last_reviewed_at, next_review_at, last_update
  ];

  const result = await client.query(query, values);
  return result.rows[0];
}

// GET: Lấy tất cả flashcard theo folder
async function getFlashcardByFolder(folder_id) {
  const query = `
    SELECT * FROM Flashcards
    WHERE folder_id = $1
    ORDER BY created_at ASC;
  `;

  const result = await client.query(query, [folder_id]);
  return result.rows;
}

// GET: Lấy flashcard đến hạn ôn tập trong folder
async function getFlashcardByDueDate(folder_id, dueDate = new Date()) {
  const query = `
    SELECT * FROM Flashcards
    WHERE folder_id = $1
      AND next_review_at IS NOT NULL
      AND next_review_at <= $2
    ORDER BY next_review_at ASC;
  `;

  const result = await client.query(query, [folder_id, dueDate]);
  return result.rows;
}

// Hàm review flashcard
async function reviewFlashcard(user_id, flashcard_id, quality) {
  if (quality < 0 || quality > 5) {
    throw new Error('Quality must be between 0 and 5');
  }

  // 1. Lấy thông tin flashcard hiện tại
  const selectRes = await client.query(
    'SELECT ease_factor, interval, repetition FROM Flashcard WHERE id = $1',
    [flashcard_id]
  );
  if (selectRes.rows.length === 0) {
    throw new Error('Flashcard not found');
  }

  let { ease_factor, interval, repetition } = selectRes.rows[0];

  // 2. Áp dụng thuật toán SM-2
  if (quality >= 3) {
    repetition += 1;

    if (repetition === 1) {
      interval = 1;
    } else if (repetition === 2) {
      interval = 6;
    } else {
      interval = Math.round(interval * ease_factor);
    }

    // Cập nhật hệ số dễ nhớ
    ease_factor = ease_factor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
    if (ease_factor < 1.3) {
      ease_factor = 1.3;
    }
  } else {
    // Trả về trạng thái ban đầu nếu chất lượng kém
    repetition = 0;
    interval = 1;
  }

  // 3. Ghi vào bảng Review
  await client.query(
    `INSERT INTO Review (
      user_id, flashcard_id, review_date, quality,
      ease_factor, interval, repetition
    ) VALUES ($1, $2, NOW(), $3, $4, $5, $6)`,
    [user_id, flashcard_id, quality, ease_factor, interval, repetition]
  );

  // 4. Cập nhật bảng Flashcard
  await client.query(
    `UPDATE Flashcards SET
      ease_factor = $1,
      interval = $2,
      repetition = $3,
      last_quality = $4,
      last_reviewed_at = NOW(),
      next_review_at = NOW() + ($2 || ' days')::interval,
      last_update = NOW()
     WHERE id = $5`,
    [ease_factor, interval, repetition, quality, flashcard_id]
  );

  return {
    flashcard_id,
    ease_factor,
    interval,
    repetition,
    next_review_in_days: interval
  };
}

// UPDATE: Cập nhật flashcard (chỉ front & back)
async function updateFlashcard(id, front_text, back_text) {
  const query = `
    UPDATE Flashcards
    SET front_text = $1,
        back_text = $2,
        last_update = NOW()
    WHERE id = $3
    RETURNING *;
  `;
  const values = [front_text, back_text, id];
  const result = await client.query(query, values);
  return result.rows[0];
}

// DELETE: Xoá flashcard theo ID
async function deleteFlashcard(flashcardId) {
  const query = `
    DELETE FROM Flashcards
    WHERE id = $1
    RETURNING *;
  `;

  const result = await client.query(query, [flashcardId]);
  const deletedFlashcard = result.rows[0];

  if (!deletedFlashcard) return null;

  // Gọi cập nhật số lượng flashcard trong folder
  await folderModel.updateFlashcardCount(deletedFlashcard.folder_id);

  return deletedFlashcard;
}
async function getFlashcardForQuizByFolder(folderId) {
  const result = await client.query(
    `
    SELECT 
      f.id, 
      f.front_text AS front, 
      f.back_text AS back,
      f.folder_id,
      folders.name AS folder_name
    FROM flashcards f
    JOIN folders ON f.folder_id = folders.id
    WHERE f.folder_id = $1
    `,
    [folderId]
  );
  return result.rows;
}

async function updateQuizScore(folderId, score) {
  const query = `UPDATE folders SET coreQuizFlashcard = $1 WHERE id = $2`;
  await client.query(query, [score, folderId]);
}


module.exports = {
  insertFlashcard,
  getFlashcardByFolder,
  getFlashcardByDueDate,
  reviewFlashcard,
  updateFlashcard,
  deleteFlashcard,
  getFlashcardForQuizByFolder,
  updateQuizScore
};
