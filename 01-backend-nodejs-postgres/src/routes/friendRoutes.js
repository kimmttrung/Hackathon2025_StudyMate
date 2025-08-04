const express = require('express');
const router = express.Router();
const {
    getUsers,
    sendRequest,
    getFriends,
    getPendingRequests,
    acceptRequest,
    declineRequest
} = require('../controllers/friendController');
const jwtauth = require("../middleware/jwtauth"); // Middleware xác thực

// Lấy danh sách người dùng (trừ bản thân) để gợi ý kết bạn
router.get('/suggestions', jwtauth, getUsers);

// Gửi yêu cầu kết bạn
router.post("/send", jwtauth, sendRequest);

// Lấy danh sách bạn bè đã chấp nhận
router.get("/list", jwtauth, getFriends);

// Lấy danh sách lời mời kết bạn đang chờ xác nhận (người dùng hiện tại là người nhận)
router.get("/pending", jwtauth, getPendingRequests);

// Chấp nhận lời mời kết bạn
router.post("/accept", jwtauth, acceptRequest);

// Từ chối lời mời kết bạn
router.post("/decline", jwtauth, declineRequest);

module.exports = router;