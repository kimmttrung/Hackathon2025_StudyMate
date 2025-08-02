const express = require('express');
const router = express.Router();
const folderQuizController = require('../controllers/folderQuizController');
// const authenticate = require('../middlewares/auth.middleware'); // nếu có

// POST /api/folder-quiz
router.post('/create', folderQuizController.createFolderQuiz);
// GET tất cả folderQuiz theo user_id
router.get('/user/:user_id', folderQuizController.getFolderQuiz);

module.exports = router;