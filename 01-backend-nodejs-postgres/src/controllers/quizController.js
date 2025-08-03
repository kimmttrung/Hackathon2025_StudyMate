// controllers/quizController.js
const quizModel = require("../models/quizModel");

// POST /api/quiz/create
exports.createMultipleQuizzes = async (req, res) => {
    const { folder_id, quizzes } = req.body;

    if (!folder_id || !Array.isArray(quizzes)) {
        return res.status(400).json({ message: "Dữ liệu không hợp lệ." });
    }

    try {
        const created = [];

        for (const quiz of quizzes) {
            const createdQuiz = await quizModel.insertQuiz({
                folder_id,
                question_text: quiz.question_text,
                question_image: quiz.question_image || null,
                option_a: quiz.option_a,
                option_b: quiz.option_b,
                option_c: quiz.option_c,
                option_d: quiz.option_d,
                correct_option: quiz.correct_option,
                explanation: quiz.explanation || null,
            });

            created.push(createdQuiz);
        }

        res.status(201).json({
            CD: 1,
            message: "Tạo quiz thành công.",
            quizzes: created,
        });
    } catch (error) {
        console.error("Lỗi khi tạo quiz:", error);
        res.status(500).json({ message: "Đã xảy ra lỗi server." });
    }
};

// Lấy tất cả quiz trong folder
exports.getQuizzesByFolder = async (req, res) => {
    const { folder_id } = req.params;

    try {
        const quizzes = await quizModel.getQuizzesByFolderId(folder_id);
        res.status(200).json({ quizzes });
    } catch (err) {
        console.error("❌ Lỗi khi lấy quiz:", err);
        res.status(500).json({ message: "Lỗi server khi lấy quiz." });
    }
};

// PUT /api/quiz/:id
exports.updateQuizById = async (req, res) => {
    const { id } = req.params;
    const updatedFields = req.body;

    try {
        const updated = await quizModel.updateQuiz(id, updatedFields);
        res.status(200).json({
            CD: 1,
            message: "Cập nhật quiz thành công.",
            quiz: updated,
        });
    } catch (err) {
        console.error("❌ Lỗi khi cập nhật quiz:", err);
        res.status(500).json({ message: "Lỗi server khi cập nhật quiz." });
    }
};

// DELETE /api/quiz/:id
exports.deleteQuizById = async (req, res) => {
    const { id } = req.params;

    try {
        await quizModel.deleteQuizById(id);
        res.status(200).json({ CD: 1, message: "Đã xóa quiz thành công." });
    } catch (err) {
        console.error("❌ Lỗi khi xóa quiz:", err);
        res.status(500).json({ message: "Lỗi server khi xóa quiz." });
    }
};

