const express = require('express');
const router = express.Router();
const folderController = require('../controllers/folderController');

// POST /folders - tạo folder mới
router.post('/create', folderController.createFolder);

// GET /folders/:user_id - lấy folder theo user, có sắp xếp
router.get('/:user_id', folderController.getAllFolders);
router.delete('/:id', folderController.deleteFolderController);
router.put("/:id", folderController.updateFolderNameController);
// lấy thông tin flashcard từ 1 folder
router.get('/:id/details', folderController.getFolderDetails);

module.exports = router;
