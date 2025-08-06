const db = require("../config/db");

const QuizAttempt = {
    async getAttemptCount(user_id, folder_id) {
        const result = await db.query(
            `SELECT COUNT(*) FROM QuizAttempts WHERE user_id = $1 AND folder_id = $2`,
            [user_id, folder_id]
        );
        return parseInt(result.rows[0].count);
    },

    async createAttempt(data) {
        const {
            user_id,
            folder_id,
            correct_items,
            total_items,
            score,
            time_taken,
            attempt_number,
            questions,
        } = data;

        const result = await db.query(
            `INSERT INTO QuizAttempts (
        user_id, folder_id, correct_items, total_items, score,
        time_taken, attempt_number, questions
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
            [
                user_id,
                folder_id,
                correct_items,
                total_items,
                score,
                time_taken,
                attempt_number,
                JSON.stringify(questions),
            ]
        );
        return result.rows[0];
    },

    async getAttemptsByUser(user_id) {
        const result = await db.query(
            `SELECT * FROM QuizAttempts WHERE user_id = $1 ORDER BY created_at DESC`,
            [user_id]
        );
        return result.rows;
    }
};

module.exports = QuizAttempt;
