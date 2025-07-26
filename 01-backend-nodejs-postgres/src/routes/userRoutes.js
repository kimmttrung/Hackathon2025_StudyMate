const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const multer = require("multer");
const jwtauth = require("../middleware/jwtauth");

// Cấu hình lưu file ảnh
const storage = multer.memoryStorage(); // Nếu bạn muốn lưu file vào RAM, hoặc dùng diskStorage để lưu vào thư mục
const upload = multer({ storage });

router.put("/update", upload.single("avatar"), userController.updateUserController);
router.get('/account', jwtauth, userController.getAccountController);

module.exports = router;
