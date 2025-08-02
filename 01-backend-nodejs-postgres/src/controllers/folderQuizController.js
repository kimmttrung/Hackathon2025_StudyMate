const FolderQuiz = require('../models/folderQuizModel');

const createFolderQuiz = async (req, res) => {
    try {
        const { name, user_id } = req.body;
        if (!user_id || !name) {
            return res.status(400).json({ message: "Thiếu user_id hoặc name" });
        }

        const newFolder = await FolderQuiz.createFolderQuiz(user_id, name.trim());

        res.status(201).json({
            message: "Tạo thư mục quiz thành công.",
            folder: newFolder,
        });
    } catch (error) {
        console.error("Lỗi khi tạo thư mục quiz:", error);
        res.status(500).json({ message: "Lỗi server khi tạo thư mục quiz." });
    }
};

const getFolderQuiz = async (req, res) => {
    try {
        const { user_id } = req.params;
        if (!user_id) {
            return res.status(400).json({ message: "Thiếu user_id" });
        }

        const folders = await FolderQuiz.getFolderQuizByUserId(user_id);

        res.status(200).json({
            message: "Lấy danh sách thư mục quiz thành công.",
            folders: folders,
        });
    } catch (error) {
        console.error("Lỗi khi lấy thư mục quiz:", error);
        res.status(500).json({ message: "Lỗi server khi lấy thư mục quiz." });
    }
};



module.exports = {
    createFolderQuiz,
    getFolderQuiz
};
