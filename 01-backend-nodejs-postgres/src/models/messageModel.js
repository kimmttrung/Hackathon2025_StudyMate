const db = require("../config/db");

// Hàm lưu tin nhắn
async function saveMessage({ sender_id, receiver_id, content, type = 'text' }) {
    try {
        const result = await db.query(
            `INSERT INTO messages (sender_id, receiver_id, content, type)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
            [sender_id, receiver_id, content, type]
        );

        return result.rows[0]; // trả về bản ghi vừa lưu
    } catch (error) {
        console.error("❌ Lỗi khi lưu tin nhắn:", error);
        throw error;
    }
}

// Hàm lấy lịch sử tin nhắn giữa 2 người
async function getMessagesBetween(user1_id, user2_id) {
    try {
        const result = await db.query(
            `SELECT * FROM messages
       WHERE (sender_id = $1 AND receiver_id = $2)
          OR (sender_id = $2 AND receiver_id = $1)
       ORDER BY created_at ASC`,
            [user1_id, user2_id]
        );

        return result.rows;
    } catch (error) {
        console.error("❌ Lỗi khi lấy tin nhắn:", error);
        throw error;
    }
}

module.exports = {
    saveMessage,
    getMessagesBetween
};
