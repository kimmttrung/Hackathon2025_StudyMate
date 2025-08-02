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

// Xóa folder
const deleteFolderQuiz = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await FolderQuiz.deleteFolderQuiz(id);
        if (!deleted) {
            return res.status(404).json({ message: "Không tìm thấy thư mục" });
        }
        res.json({ message: "Xóa thư mục thành công", folder: deleted });
    } catch (error) {
        console.error("Lỗi khi xóa folder:", error);
        res.status(500).json({ message: "Lỗi server" });
    }
};

// Sửa tên folder
const updateFolderQuiz = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: "Thiếu tên thư mục mới" });
        }
        const updated = await FolderQuiz.updateFolderQuiz(id, name.trim());
        if (!updated) {
            return res.status(404).json({ message: "Không tìm thấy thư mục để cập nhật" });
        }
        res.json({ message: "Cập nhật thành công", folder: updated });
    } catch (error) {
        console.error("Lỗi khi cập nhật:", error);
        res.status(500).json({ message: "Lỗi server" });
    }
};

module.exports = {
    createFolderQuiz,
    getFolderQuiz,
    deleteFolderQuiz,
    updateFolderQuiz
};
