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

module.exports = {
    createFolderQuiz,
    getFolderQuizByUserId
};
