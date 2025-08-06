const db = require("../config/db");

const LearningProgress = {
    async addProgress(data) {
        const {
            user_id,
            type,
            reference_id,
            score,
            total_items,
            correct_items,
            time_taken,
        } = data;

        const result = await db.query(
            `INSERT INTO learning_progress (
        user_id, type, reference_id, score, total_items,
        correct_items, time_taken
      ) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
            [
                user_id,
                type,
                reference_id,
                score,
                total_items,
                correct_items,
                time_taken,
            ]
        );
        return result.rows[0];
    },

    async getByUser(user_id) {
        const result = await db.query(
            `
        SELECT 
            lp.*, 
            qa.questions, 
            qa.attempt_number, 
            qa.created_at AS quiz_created_at
        FROM learning_progress lp
        LEFT JOIN QuizAttempts qa
            ON lp.user_id = qa.user_id 
            AND lp.reference_id = qa.folder_id 
            AND lp.type = 'quiz'
        WHERE lp.user_id = $1
        ORDER BY lp.attempt_at DESC
        `,
            [user_id]
        );

        // Ghép dữ liệu thành structure như mockLearningProgress
        const formatted = result.rows.map(row => {
            const {
                questions,
                attempt_number,
                quiz_created_at,
                ...rest
            } = row;

            const details =
                row.type === "quiz"
                    ? {
                        questions,
                        attempt_number
                    }
                    : null;

            return {
                ...rest,
                details,
                created_at: quiz_created_at || row.attempt_at
            };
        });

        return formatted;
    }

};



module.exports = LearningProgress;
