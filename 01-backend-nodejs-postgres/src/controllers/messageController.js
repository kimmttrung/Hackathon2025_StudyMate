const { getMessagesBetween } = require("../models/messageModel");

// /api/messages/:userId
const getMessageHistory = async (req, res) => {
    const currentUserId = req.user.id; // bạn cần middleware `authMiddleware`
    const friendId = parseInt(req.params.userId, 10);

    if (!friendId) return res.status(400).json({ error: "Thiếu userId bạn muốn xem tin nhắn" });

    try {
        const messages = await getMessagesBetween(currentUserId, friendId);
        return res.json({ success: true, messages });
    } catch (err) {
        console.error("❌ Lỗi lấy tin nhắn:", err);
        return res.status(500).json({ error: "Lỗi server khi lấy tin nhắn" });
    }
};

module.exports = {
    getMessageHistory,
};
