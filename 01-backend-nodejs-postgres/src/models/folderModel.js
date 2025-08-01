const client = require('../config/db');

// Tạo folder mới
async function createFolder(user_id, name) {
  const query = `
    INSERT INTO Folders (user_id, name)
    VALUES ($1, $2)
    RETURNING *;
  `;
  const values = [user_id, name];

  const result = await client.query(query, values);
  return result.rows[0];
}

// Lấy tất cả folder của user, sắp xếp tùy ý
async function getAllFolders(user_id, sortBy = 'created_at', sortOrder = 'asc') {
  // Danh sách cột được phép sắp xếp để tránh SQL injection
  const allowedSortFields = ['name', 'created_at', 'last_update'];
  const sortField = allowedSortFields.includes(sortBy) ? sortBy : 'created_at';

  const query = `
    SELECT * FROM Folders
    WHERE user_id = $1
    ORDER BY ${sortField} ${sortOrder.toUpperCase()};
  `;

  const result = await client.query(query, [user_id]);
  return result.rows;
}

async function deleteFolder(id) {
  const query = 'DELETE FROM folders WHERE id = $1';
  await client.query(query, [id]);
}

async function updateFolderName(id, name) {
  const query = `
    UPDATE folders
    SET name = $1, last_update = CURRENT_TIMESTAMP
    WHERE id = $2
    RETURNING *
  `;
  const result = await client.query(query, [name, id]);
  return result.rows[0];
}

async function updateFlashcardCount(folderId) {
  const countQuery = `
    SELECT COUNT(*) FROM Flashcards WHERE folder_id = $1
  `;
  const updateQuery = `
    UPDATE Folders SET flascardcount = $1 WHERE id = $2
  `;

  // Đếm số flashcard hiện có
  const countResult = await client.query(countQuery, [folderId]);
  const count = parseInt(countResult.rows[0].count, 10);

  // Cập nhật lại bảng Folders
  await client.query(updateQuery, [count, folderId]);
}

async function getFolderWithCards(folderId) {
  const folderQuery = `SELECT * FROM Folders WHERE id = $1`;
  const cardQuery = `SELECT id, front_text AS front, back_text AS back FROM Flashcards WHERE folder_id = $1`;

  const folderResult = await client.query(folderQuery, [folderId]);
  if (folderResult.rowCount === 0) return null;

  const cardResult = await client.query(cardQuery, [folderId]);

  const folder = folderResult.rows[0];
  folder.cards = cardResult.rows;

  return folder;
}

async function updateQuizScore(folderId, score) {
  const query = `UPDATE folders SET corequizflashcard = $1 WHERE id = $2`;
  await client.query(query, [score, folderId]);
}

module.exports = {
  createFolder,
  getAllFolders,
  deleteFolder,
  updateFolderName,
  updateFlashcardCount,
  getFolderWithCards,
  updateQuizScore
};
