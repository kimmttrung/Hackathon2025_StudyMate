const pool = require("../config/db");

// Cập nhật lại num_quizzes cho folder
const updateFolderQuizCount = async (folder_id) => {
    const countQuery = `SELECT COUNT(*) FROM Quizzes WHERE folder_id = $1`;
    const updateQuery = `UPDATE folderquizs SET num_quizzes = $2 WHERE id = $1`;

    const result = await pool.query(countQuery, [folder_id]);
    const count = parseInt(result.rows[0].count, 10);

    await pool.query(updateQuery, [folder_id, count]);
};

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
    // Cập nhật num_quizzes sau khi insert
    await updateFolderQuizCount(folder_id);
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

// Delete quiz
exports.deleteQuizById = async (quiz_id) => {
    // Lấy folder_id trước khi xóa
    const getQuery = `SELECT folder_id FROM Quizzes WHERE id = $1`;
    const res = await pool.query(getQuery, [quiz_id]);
    const folder_id = res.rows[0]?.folder_id;

    // Tiến hành xóa
    const deleteQuery = `DELETE FROM Quizzes WHERE id = $1`;
    await pool.query(deleteQuery, [quiz_id]);

    // 👉 Cập nhật lại num_quizzes sau khi xóa
    if (folder_id) {
        await updateFolderQuizCount(folder_id);
    }
};

// (Tuỳ chọn) Cập nhật câu hỏi quiz
exports.updateQuiz = async (quiz_id, updatedFields) => {
    // ❌ Loại bỏ updated_at nếu có trong request
    delete updatedFields.updated_at;

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


