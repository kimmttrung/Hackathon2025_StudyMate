const client = require('../config/db');

// Thêm một bản ghi review mới
async function addReview({
  user_id,
  flashcard_id,
  quality,
  ease_factor,
  interval,
  repetition
}) {
  const query = `
    INSERT INTO Review (
      user_id, flashcard_id, review_date,
      quality, ease_factor, interval, repetition
    )
    VALUES ($1, $2, NOW(), $3, $4, $5, $6)
    RETURNING *;
  `;

  const values = [user_id, flashcard_id, quality, ease_factor, interval, repetition];
  const result = await client.query(query, values);
  return result.rows[0];
}

// Lấy tất cả review theo flashcard (lịch sử ôn tập)
async function getReviewsByFlashcard(flashcard_id) {
  const query = `
    SELECT * FROM Review
    WHERE flashcard_id = $1
    ORDER BY review_date DESC;
  `;

  const result = await client.query(query, [flashcard_id]);
  return result.rows;
}

// Lấy review gần nhất của flashcard
async function getLatestReview(user_id, flashcard_id) {
  const query = `
    SELECT * FROM Review
    WHERE user_id = $1 AND flashcard_id = $2
    ORDER BY review_date DESC
    LIMIT 1;
  `;

  const result = await client.query(query, [user_id, flashcard_id]);
  return result.rows[0] || null;
}

// Lấy toàn bộ review của 1 user
async function getReviewsByUser(user_id) {
  const query = `
    SELECT * FROM Review
    WHERE user_id = $1
    ORDER BY review_date DESC;
  `;

  const result = await client.query(query, [user_id]);
  return result.rows;
}

module.exports = {
  addReview,
  getReviewsByFlashcard,
  getLatestReview,
  getReviewsByUser
};
