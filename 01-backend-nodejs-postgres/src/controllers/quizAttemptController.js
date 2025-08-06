const QuizAttempt = require("../models/quizAttemptModel");
const LearningProgress = require("../models/learningProgressModel");

const quizAttemptController = {
    async saveQuizResult(req, res) {
        try {
            const {
                user_id,
                folder_id,
                correct_items,
                total_items,
                score,
                time_taken,
                difficulty,
                questions,
            } = req.body;

            if (!user_id || !folder_id || !questions) {
                return res.status(400).json({ error: "Thiếu dữ liệu bắt buộc." });
            }

            // Tự tính attempt_number
            const previousAttempts = await QuizAttempt.getAttemptCount(user_id, folder_id);
            const attempt_number = previousAttempts + 1;

            // 1. Lưu bảng QuizAttempts
            const newAttempt = await QuizAttempt.createAttempt({
                user_id,
                folder_id,
                correct_items,
                total_items,
                score,
                time_taken,
                difficulty,
                attempt_number,
                questions,
            });

            // 2. Ghi vào bảng learning_progress
            await LearningProgress.addProgress({
                user_id,
                type: "quiz",
                reference_id: folder_id,
                score,
                total_items,
                correct_items,
                time_taken,
            });

            res.status(201).json({ message: "Đã lưu kết quả", attempt: newAttempt });
        } catch (err) {
            console.error("Lỗi lưu quiz:", err);
            res.status(500).json({ error: "Lỗi server khi lưu kết quả" });
        }
    },

    async getUserAttempts(req, res) {
        try {
            const { user_id } = req.params;
            const attempts = await QuizAttempt.getAttemptsByUser(user_id);
            res.json({ attempts });
        } catch (err) {
            res.status(500).json({ error: "Lỗi khi lấy dữ liệu quiz" });
        }
    },
};

module.exports = quizAttemptController;
