// controllers/friendshipController.js
const Friendship = require("../models/friendModel");

exports.sendRequest = async (req, res) => {
    const { receiver_id } = req.body;
    const requester_id = req.user.id;

    try {
        const friend = await Friendship.sendRequest(requester_id, receiver_id);
        res.status(201).json({ success: true, friend });
    } catch (err) {
        if (err.message.includes("already exists")) {
            return res.status(400).json({ success: false, message: "Đã gửi lời mời hoặc đã là bạn." });
        }

        console.error("sendRequest error:", err);
        res.status(500).json({ success: false, message: "Không thể gửi lời mời." });
    }
};


exports.getFriends = async (req, res) => {
    const user_id = req.user.id;

    try {
        const friends = await Friendship.getFriends(user_id);
        // console.log("✅ Friends trả về từ DB:", friends);
        res.status(200).json({ success: true, friends });
    } catch (err) {
        console.error("getFriends error:", err);
        res.status(500).json({ success: false, message: "Failed to get friends" });
    }
};

exports.getPendingRequests = async (req, res) => {
    const user_id = req.user.id;

    try {
        const requests = await Friendship.getPendingRequests(user_id);
        res.status(200).json({ success: true, requests });
    } catch (err) {
        console.error("getPendingRequests error:", err);
        res.status(500).json({ success: false, message: "Failed to get requests" });
    }
};

exports.acceptRequest = async (req, res) => {
    const { requester_id } = req.body;
    const receiver_id = req.user.id; // người hiện tại

    try {
        const accepted = await Friendship.acceptRequest(requester_id, receiver_id);

        if (!accepted) {
            return res.status(404).json({ success: false, message: "Không tìm thấy lời mời kết bạn." });
        }

        res.status(200).json({ success: true, accepted });
    } catch (err) {
        console.error("acceptRequest error:", err);
        res.status(500).json({ success: false, message: "Không thể chấp nhận lời mời." });
    }
};

exports.declineRequest = async (req, res) => {
    const { requester_id } = req.body;
    const receiver_id = req.user.id;

    try {
        const declined = await Friendship.declineRequest(requester_id, receiver_id);
        res.status(200).json({ success: true, declined });
    } catch (err) {
        console.error("declineRequest error:", err);
        res.status(500).json({ success: false, message: "Failed to decline request" });
    }
};

exports.getSuggestedUsers = async (req, res) => {
    const user_id = req.user.id;

    try {
        const users = await Friendship.getAllUsersWithStats(user_id);
        res.status(200).json({ success: true, users });
    } catch (err) {
        console.error("getSuggestedUsers error:", err);
        res.status(500).json({ success: false, message: "Failed to get suggested users" });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const currentUserId = req.user.id;
        // console.log("check currentUserId", currentUserId);

        const users = await Friendship.getAllUsersWithStats(currentUserId);
        res.json({ success: true, data: users });
    } catch (error) {
        console.error('Lỗi khi lấy danh sách người dùng:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};