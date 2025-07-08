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

module.exports = {
  createFolder,
  getAllFolders,
  deleteFolder,
  updateFolderName
};
