const express = require('express');
const router = express.Router();
const folderController = require('../controllers/folderController');

// POST /folders - tạo folder mới
router.post('/create', folderController.createFolder);

// GET /folders/:user_id - lấy folder theo user, có sắp xếp
// Ví dụ: /folders/1?sortBy=name&sortOrder=desc
router.get('/:user_id', folderController.getAllFolders);

module.exports = router;
