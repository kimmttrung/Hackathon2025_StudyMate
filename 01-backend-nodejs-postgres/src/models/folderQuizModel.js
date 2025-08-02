const pool = require('../config/db');

const createFolderQuiz = async (userId, name) => {
    const query = `
    INSERT INTO folderquizs (user_id, name, created_at)
    VALUES ($1, $2, NOW())
    RETURNING *;
  `;
    const values = [userId, name];
    const result = await pool.query(query, values);
    return result.rows[0];
};

// Lấy tất cả folderQuiz theo user_id
const getFolderQuizByUserId = async (userId) => {
    const query = `
        SELECT * FROM folderquizs
        WHERE user_id = $1
        ORDER BY created_at DESC;
    `;
    const values = [userId];
    const result = await pool.query(query, values);
    return result.rows;
};

// Xóa
const deleteFolderQuiz = async (folderId) => {
    const query = `DELETE FROM folderquizs WHERE id = $1 RETURNING *;`;
    const values = [folderId];
    const result = await pool.query(query, values);
    return result.rows[0];
};

// Chỉnh sửa
const updateFolderQuiz = async (folderId, newName) => {
    const query = `
    UPDATE folderquizs
    SET name = $1, updated_at = NOW()
    WHERE id = $2
    RETURNING *;
  `;
    const values = [newName, folderId];
    const result = await pool.query(query, values);
    return result.rows[0];
};

module.exports = {
    createFolderQuiz,
    getFolderQuizByUserId,
    deleteFolderQuiz,
    updateFolderQuiz
};
