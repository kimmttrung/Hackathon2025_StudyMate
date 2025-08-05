const db = require("../config/db");

const LearningProgressModel = {
    async create({ user_id, type, reference_id, score, total_items, correct_items, time_taken }) {
        const query = `
      INSERT INTO learning_progress 
      (user_id, type, reference_id, score, total_items, correct_items, time_taken)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;
        const values = [user_id, type, reference_id, score, total_items, correct_items, time_taken];
        const result = await db.query(query, values);
        return result.rows[0];
    },

    async getByUser(user_id) {
        const query = `SELECT * FROM learning_progress WHERE user_id = $1 ORDER BY attempt_at DESC`;
        const result = await db.query(query, [user_id]);
        return result.rows;
    },
};

module.exports = LearningProgressModel;
