const LearningProgressModel = require("../models/learningProgressModel");

const LearningProgressController = {
    async create(req, res) {
        try {
            const { user_id, type, reference_id, score, total_items, correct_items, time_taken } = req.body;

            if (!user_id || !type || !reference_id) {
                return res.status(400).json({ message: "Thiếu thông tin bắt buộc." });
            }

            const newRecord = await LearningProgressModel.create({
                user_id,
                type,
                reference_id,
                score,
                total_items,
                correct_items,
                time_taken
            });

            res.status(201).json(newRecord);
        } catch (err) {
            console.error("Lỗi tạo learning progress:", err);
            res.status(500).json({ message: "Lỗi server." });
        }
    },

    async getAllByUser(req, res) {
        try {
            const { user_id } = req.params;
            const data = await LearningProgressModel.getByUser(user_id);
            res.json(data);
        } catch (err) {
            console.error("Lỗi lấy dữ liệu:", err);
            res.status(500).json({ message: "Lỗi server." });
        }
    },
};

module.exports = LearningProgressController;
