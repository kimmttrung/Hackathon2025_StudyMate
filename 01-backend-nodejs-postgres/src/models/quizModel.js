const pool = require("../config/db");

// Thêm 1 câu hỏi quiz mới
exports.insertQuiz = async ({
    folder_id,
    question_text,
    question_image = null,
    option_a,
    option_b,
    option_c,
    option_d,
    correct_option,
    explanation = null,
}) => {
    const query = `
        INSERT INTO Quizzes (
            folder_id,
            question_text,
            question_image,
            option_a,
            option_b,
            option_c,
            option_d,
            correct_option,
            explanation,
            created_at,
            updated_at
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW())
        RETURNING *;
    `;
    const values = [
        folder_id,
        question_text,
        question_image,
        option_a,
        option_b,
        option_c,
        option_d,
        correct_option,
        explanation,
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
};

// Lấy danh sách câu hỏi quiz trong 1 folder
exports.getQuizzesByFolderId = async (folder_id) => {
    const query = `
        SELECT * FROM Quizzes
        WHERE folder_id = $1
        ORDER BY created_at DESC;
    `;
    const result = await pool.query(query, [folder_id]);
    return result.rows;
};

// Xóa 1 quiz
exports.deleteQuizById = async (quiz_id) => {
    const query = `DELETE FROM Quizzes WHERE id = $1`;
    await pool.query(query, [quiz_id]);
};

// (Tuỳ chọn) Cập nhật câu hỏi quiz
exports.updateQuiz = async (quiz_id, updatedFields) => {
    const fields = Object.keys(updatedFields);
    const values = Object.values(updatedFields);

    const setClause = fields
        .map((field, index) => `${field} = $${index + 1}`)
        .join(", ");

    const query = `
        UPDATE Quizzes
        SET ${setClause}, updated_at = NOW()
        WHERE id = $${fields.length + 1}
        RETURNING *;
    `;

    const result = await pool.query(query, [...values, quiz_id]);
    return result.rows[0];
};
